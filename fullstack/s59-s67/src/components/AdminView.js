import {useState, useEffect, useContext} from 'react';
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import EditCourse from './EditCourse';

export default function AdminView ({ coursesData, fetchData }) {

    const [courses, setCourses] = useState([]);

    
    useEffect(() => {
        setCourses(coursesData);
    }, [coursesData]);
 

  return (
        <div className="container mt-5">
        <h2 className="text-center my-4">Admin Dashboard</h2>
        <table className='table striped bordered hover responsive'>
            <thead className="text-center">
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Availability</th>
                <th colSpan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    courses.map(course => (
                        <tr key={course._id}>
                            <td>{course._id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.price}</td>
                            <td className={course.isActive ? 'text-success' : 'text-danger'}>
                                {course.isActive ? 'Available' : 'Unavailable'}
                            </td>
                            <td>
                                {/* <button className="btn btn-primary">Edit</button> */}
                                <EditCourse course={course} fetchData={fetchData}/>
                            </td>
                            <td><button className="btn btn-danger">Archive</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  );
};

