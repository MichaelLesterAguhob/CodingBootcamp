import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setComfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    // console.log(firstName);    
    // console.log(lastName);    
    // console.log(email);    
    // console.log(mobileNo);    
    // console.log(password);    
    // console.log(confirmPassword);    

    useEffect(() => {
        if((firstName !== "") && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "" && mobileNo.length === 11 && (password === confirmPassword)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
        console.log(isActive)
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    function registerUser(e) {
        e.preventDefault();
        fetch('http://localhost:4000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            }) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.message === "User successfully registered") {
                setFirstName('');
                setlastName('');
                setEmail('');
                setMobileNo('');
                setPassword('');
                setComfirmPassword('');

                alert('Registration SUccessful');
            } else if(data.message == 'Email invalid') {
                alert('Email is invalid');
            } else if(data.message === 'Mobile number is invalid') {
                alert('Mobile number is invalid')
            } else if (data.message === 'Password must be atleast 8 characters'){
                alert('Password must be atleast 8 characters')
            } else {
                alert('Something went wrong')
            }
        })

    }

    return (
        <Form onSubmit={(e) => registerUser(e)}>
            <h1 className='my-5 text-center'>Register</h1>
            <Form.Group>
                <Form.Label>First Name: </Form.Label>
                <Form.Control type='text' placeholder='Enter First Name' required value={firstName} onChange={e => {setFirstName(e.target.value)}} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name: </Form.Label>
                <Form.Control type='text' placeholder='Enter Last Name' required value={lastName} onChange={e => {setlastName(e.target.value)}} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control type='email' placeholder='Enter Email' required value={email} onChange={e => {setEmail(e.target.value)}} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mobile No: </Form.Label>
                <Form.Control type='text' placeholder='Enter 11 Digit No.' required value={mobileNo} onChange={e => {setMobileNo(e.target.value)}} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control type='password' placeholder='Enter Password' required value={password} onChange={e => {setPassword(e.target.value)}} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control type='password' placeholder='Confirm Password' required value={confirmPassword} onChange={e => {setComfirmPassword(e.target.value)}} />
            </Form.Group>
            {
                isActive ?  
                <Button variant='primary' type='submit' id="submitBtn" >Submit</Button>
               :  
                <Button variant='danger' type='submit' id="submitBtn" disabled>Submit</Button>
            }
        
        </Form>
    )
}