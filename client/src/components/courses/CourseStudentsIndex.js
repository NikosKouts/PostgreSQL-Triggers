import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const CourseStudentsIndex = () => {
    const [students, setStudents] = useState([])
    const { course, university} = useParams()

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/courses/${course}/${university}/students`)
        .then(response => response.json())
        .then(data => setStudents(data));
    }, [course, university])


    return (
        <>
            <h3>Students Attending {course} at {university}</h3>
            <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-Mail</th>
                            <th>More Information</th>
                        </tr>
                        
                        {students.map(student => {
                            return (
                                <tr key={student.id_pk}>
                                    <td >{student.id_pk}</td>
                                    <td >{student.student_id}</td>
                                    <td >{student.first_name}</td>
                                    <td >{student.last_name}</td>
                                    <td >{student.email}</td>
                                    <td><Link to={`/students/${student.id_pk}`}>Show More Information</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </>
    )
}

export default CourseStudentsIndex
