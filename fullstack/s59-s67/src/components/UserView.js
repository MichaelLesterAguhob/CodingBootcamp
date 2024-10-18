import { useState, useEffect } from 'react';
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CourseCard from "../components/CourseCard";
import CourseSearch from './CourseSearch';
import CourseSearchByPrice from './CourseSearchByPrice';

const UserView = ({ coursesData }) => {
    const [courses, setCourses] = useState([]);

    
    useEffect(() => {
        setCourses(coursesData.map(course => {
            return <CourseCard key={course._id} courseProp={course} />
        }))
    }, [coursesData]);


  return (
        <>
            <CourseSearch />
            <CourseSearchByPrice />
            {courses}
        </>

    // <Container>
    //   <h2 className="my-4">Available Courses</h2>
    //   <Row>
    //     {coursesData.map((course, index) => (
    //       <Col md={4} key={index} className="mb-4">
    //         <Card>
    //           <Card.Body>
    //             <Card.Title>{course.name}</Card.Title>
    //             <Card.Subtitle>Description:</Card.Subtitle>
    //             <Card.Text>{course.description}</Card.Text>
    //             <Card.Subtitle>Price:</Card.Subtitle>
    //             <Card.Text>{course.price}</Card.Text>
    //             <Button variant="primary" >Details
    //             </Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     ))}
    //   </Row>
    // </Container>
  );
};

export default UserView;
