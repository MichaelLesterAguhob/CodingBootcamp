import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
        if(email !== "" && password !== "") {
            setisActive(true);
        } else {
            setisActive(false);
        }
        console.log(isActive)
    }, [email, password]);  

    
    function authenticate(e) {
        e.preventDefault();
        fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

          if (data.access) {
            alert("Thank you logging in.");
            // console.log("Token:", data.access);
            localStorage.setItem('token', data.access);
            setEmail("");
            setPassword("");
          } else if (data.message === "Incorrect email or password") {
            alert("Incorrect email or password");
          } else if (data.message === "Email does not exist") {
            alert("Email does not exist");
          } else {
            alert("Something went wrong");
          }
        })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
           // member 5 code here
           
        })
    }
    
  return (
    localStorage.getItem("token") !== null ? 
    <Navigate to="/courses" />
    :
    <Form onSubmit={(e) => {authenticate(e)}}>
      <h1 className="my-5 text-center">Login</h1>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter email"
            required
            value={email}
            onChange={e => {setEmail(e.target.value)}}
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={e => {setPassword(e.target.value)}}
            />
        </Form.Group>
        {
            isActive ? 
                <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
            : 
                <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
        }
    </Form>
  );
}


