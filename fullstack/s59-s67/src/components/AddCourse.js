import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import {  useNavigate } from 'react-router-dom';
import { Notyf } from "notyf";

export default function AddCourse()  {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();
  const notyf = new Notyf();

  useEffect(() => {
    if (courseName !== "" && courseDescription !== "" && coursePrice) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [courseName, courseDescription, coursePrice]);


  function addNewCourse(e) {
    e.preventDefault();

    fetch("http://localhost:4000/courses/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
        name: courseName,
        description: courseDescription,
        price: coursePrice,
    }),
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.message === "Course already exists") {
            notyf.error("Course Already Exists");
        }else if(data.message === "Failed to save the course") {
            notyf.error("Unsuccessful Course Creation");
            setCourseName("");
            setCourseDescription("");
            setCoursePrice("");
        }else if(data.result !== null) {
            notyf.success("Course Added");
            navigate('/courses');
            setCourseName("");
            setCourseDescription("");
            setCoursePrice("");
        } else {
            notyf.error("Unsuccessful Course Creation");
            setCourseName("");
            setCourseDescription("");
            setCoursePrice("");
        }
    })
    .catch((error) => {
        console.error("Error", error);
    });
}

  return (
    <div>
      <h1>Add Course</h1>
      <Form onSubmit={(e) => {addNewCourse(e)}}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter course price"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
          />
        </Form.Group>
        {isActive ? 
          <Button variant="primary" type="submit" id="submitBtn">
            Submit
          </Button>
         : 
          <Button variant="danger" type="submit" id="submitBtn" disabled>
            Submit
          </Button>
        }
      </Form>
    </div>
  );
};
