import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const StudentAttendsCourses = () => {
    const [courses, setCourses] = useState([])
    const { student } = useParams() 

    useEffect(() => {

        fetch(`http://127.0.0.1:8080/courses/student/${student}`)
        .then(response => response.json())
        .then(data => setCourses(data));
        
    }, [student])



    return (
        <>
            <h3>Courses that Student with ID {student} Attends</h3>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>University</th>
                        <th>Professor</th>
                        <th>Delete Course</th>
                    </tr>
                    
                    {courses.map(course => {
                        return (
                            <tr key={`${course.id_pk} ${course.university_pk_fk}`}>
                                <td >{course.id_pk}</td>
                                <td >{course.name}</td>
                                <td >{course.university_pk_fk}</td>
                                <td ><Link to={`/professors/${course.professor_id_fk}`}>Professor Information</Link></td>
                                <td ><Link to={`/courses/${course.id_pk}/${course.university_pk_fk}/delete`}>Delete Course</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default StudentAttendsCourses
