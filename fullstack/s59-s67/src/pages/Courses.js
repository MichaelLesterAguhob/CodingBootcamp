import coursesData from '../data/coursesData';
import CourseCard from '../components/CourseCard'

export default function Courses() {
    // console.log(courseData);
    // console.log(courseData[0]);

    const courses = coursesData.map(course => {
        return (
            <CourseCard key={course.id} courseProp={course} />
        )
    })
    return (
        <>
            <h1>Courses</h1>
            {/* <CourseCard courseProp={courseData[0]} /> */}

            {courses}
        </>
    )
}