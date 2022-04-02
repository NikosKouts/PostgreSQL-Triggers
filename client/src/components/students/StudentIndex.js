import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';


const StudentIndex = () => {
    const [students, setStudents] = useState([])
    const { university, student } = useParams()
    var header

    if(!student){
        header = 'Available Students'
    }
    else {
        header = `Student's Information with ID: ${student}`
    }

    useEffect(() => {
        if(!university){
            if(!student){
                fetch(`http://127.0.0.1:8080/students/all`)
                .then(response => response.json())
                .then(data => setStudents(data));
            }
            else {
                fetch(`http://127.0.0.1:8080/students/${student}`)
                .then(response => response.json())
                .then(data => setStudents(data));       
            }
        }
        else {
            fetch(`http://127.0.0.1:8080/universities/${university}/students`)
            .then(response => response.json())
            .then(data => setStudents(data))
        }
    }, [university, student])

    if(!university){
        return (
            <>
                <h3>{header}</h3> 
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-Mail</th>
                            <th>Phone</th>
                            <th>Universtity</th>
                            <th>Semester</th>
                            <th>GPA</th>
                            <th>Register to Courses</th>
                            <th>Unenroll from a Course</th>
                            <th>Courses</th>
                            <th>Delete Student</th>
                        </tr>
                        {students.map(student => {
                            return (
                                <tr key={student.id_pk}>
                                    <td>{student.id_pk}</td>
                                    <td>{student.student_id}</td>
                                    <td>{student.first_name}</td>
                                    <td>{student.last_name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.university_fk}</td>
                                    <td>{student.semester}</td>
                                    <td>{student.gpa}</td>
                                    <td><Link to={`/students/${student.id_pk}/courses/register`}>Select Courses to Attend</Link></td>
                                    <td><Link to={`/students/${student.id_pk}/courses/remove`}>Unenroll from a Course</Link></td>
                                    <td><Link to={`/students/${student.id_pk}/courses`}>Show Courses</Link></td>
                                    <td><Link to={`/students/${student.id_pk}/delete`}>Delete Student</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }
    else {
        return (
            <>
                <h2>Students Attending at {university}</h2>
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
                                    <td>{student.id_pk}</td>
                                    <td>{student.student_id}</td>
                                    <td>{student.first_name}</td>
                                    <td>{student.last_name}</td>
                                    <td>{student.email}</td>
                                    <td><Link to={`/students/${student.id_pk}`}>Show More Information</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}

export default StudentIndex
