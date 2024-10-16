
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useContext(UserContext);
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
        <div>
            <h1>User Profile</h1>
            <p>First Name: {details.firstName}</p>
            <p>Last Name: {details.lastName}</p>
            <p>Email: {details.email}</p>
            <p>Mobile Number: {details.mobileNumber}</p>
        </div>
    );
}
