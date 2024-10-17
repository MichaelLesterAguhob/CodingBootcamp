
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
    const {user} = useContext(UserContext);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch("http://localhost:4000/users/details", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        })
        .then((response) => response.json())
        .then((data) => {
            if(data !== null) {
                setDetails(data)
            } else if(data.message === "User not found") {
                alert("User not found.");
            } else {
                alert("Something went wrong, kindly contact us for   assistance.");
            }
        });
    }, []);

    return (
        user.id === null ?
        <Navigate to="/courses" />
        :
        <div className='bg-primary text-light p-5'>
            <h1>User Profile</h1>
            <h4>{details.firstName} {details.lastName}</h4>
            <p><hr/></p>
            <h5>Contacts</h5>
            <ul>
                <li>Email: {details.email}</li>
                <li>Mobile Number: {details.mobileNo}</li>
            </ul>
        </div>
    );
}
