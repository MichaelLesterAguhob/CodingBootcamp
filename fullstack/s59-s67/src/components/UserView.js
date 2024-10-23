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
  );
};

export default UserView;
