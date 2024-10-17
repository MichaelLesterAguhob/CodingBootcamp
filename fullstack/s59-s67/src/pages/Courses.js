
import { useState, useEffect } from 'react';
// import coursesData from '../data/coursesData';
import CourseCard from '../components/CourseCard'

export default function Courses() {
    // console.log(courseData);
    // console.log(courseData[0]);

    const [courses, setCourses] = useState([]);

    // const courses = coursesData.map(course => {
    //     return (
    //         <CourseCard key={course.id} courseProp={course} />
    //     )
    // })

    useEffect(() => {
        fetch('http://localhost:4000/courses/')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCourses(data.map(course => {
                return <CourseCard key={course._id} courseProp={course} />
            }))
        })
    }, [])

    return (
        <>
            <h1>Courses</h1>
            {/* <CourseCard courseProp={courseData[0]} /> */}

            {courses}
        </>
    )
}