import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const UniversityCoursesIndex = () => {
    const [courses, setCourses] = useState([])
    const { university } = useParams()

    useEffect(() => {
        
        fetch(`http://127.0.0.1:8080/courses/university/${university}`)
        .then(response => response.json())
        .then(data => setCourses(data));
        
    }, [university])

    return (
        <>
            <h3>Courses at {university}</h3>
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
                                <td ><Link to={`/professors/${course.professor_id_fk}`}>Professor Information</Link></td>
                                <td ><Link to={`/universities/${university.name_pk}/students`}>View Students</Link></td>
                                <td ><Link to={`/universities/${university.name_pk}/delete`}>Delete</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )    
}

export default UniversityCoursesIndex
