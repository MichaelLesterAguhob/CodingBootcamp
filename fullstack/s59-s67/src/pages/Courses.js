import { useState, useEffect, useContext } from "react";
import  UserContext  from "../context/UserContext"; 
import AdminView from "../components/AdminView";  
import UserView from "../components/UserView";    


export default function Courses() {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(UserContext); 

  useEffect(() => {
    let fetchURL = user.isAdmin ? 'http://localhost:4000/courses/all' : 'http://localhost:4000/courses/';
    fetch(fetchURL, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
  }, []);

  const fetchData = () => {
    let fetchURL = user.isAdmin ? 'http://localhost:4000/courses/all' : 'http://localhost:4000/courses/';
    fetch(fetchURL, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
  }

  return (
        user.isAdmin ? 
        <>
            <h1>Courses</h1>
            <AdminView coursesData={courses} fetchData={fetchData}/>  
        </>   
        : 
          <>
            <h1>Courses</h1>
            <UserView coursesData={courses} />  
          </>
    );
}
