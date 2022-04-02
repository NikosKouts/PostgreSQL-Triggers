import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const CoursesIndex = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/courses/all`)
        .then(response => response.json())
        .then(data => setCourses(data));
    }, [])

    return (
        <>
            <h3>Available Courses</h3>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>University</th>
                        <th>Professor</th>
                        <th>Students</th>
                        <th>Delete Course</th>
                    </tr>
                    
                    {courses.map(course => {
                        return (
                            <tr key={`${course.id_pk} ${course.university_pk_fk}`}>
                                <td >{course.id_pk}</td>
                                <td >{course.name}</td>
                                <td >{course.university_pk_fk}</td>
                                <td><Link to={`/professors/${course.professor_id_fk}`}>Professor Information</Link></td>
                                <td><Link to={`/courses/${course.id_pk}/${course.university_pk_fk}/students`}>View Students</Link></td>
                                <td><Link to={`/courses/${course.id_pk}/${course.university_pk_fk}/delete`}>Delete</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )    
}

export default CoursesIndex
