import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Login() {
  const {user, setUser} = useContext(UserContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setisActive] = useState(false);

  function retrieveUserDetails(accessToken) {
    fetch('http://localhost:4000/users/details', {
        headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setUser({
            id: data._id,
            isAdmin: data.isAdmin
        })
    })
  }

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

          if (data.access !== undefined) {
            alert("Thank you logging in.");
            // console.log("Token:", data.access);
            localStorage.setItem('token', data.access);
            retrieveUserDetails(data.access);

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
    user.id !== null ? 
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


