import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const ProfessorCoursesIndex = () => {
    const [courses, setCourses] = useState([])
    const {professor} = useParams()

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/courses/professor/${professor}`)
        .then(response => response.json())
        .then(data => setCourses(data));
    }, [professor])

    return (
        <>
            <h3>Courses Taught by Professor with ID: {professor}</h3>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>University</th>
                        <th>Students</th>
                        <th>Delete Course</th>
                    </tr>
                    
                    {courses.map(course => {
                        return (
                            <tr key={`${course.id_pk} ${course.university_pk_fk}`}>
                                <td >{course.id_pk}</td>
                                <td >{course.name}</td>
                                <td >{course.university_pk_fk}</td>
                                <td ><Link to={`/courses/${course.id_pk}/${course.university_pk_fk}/students`}>Show Students</Link></td>
                                <td ><Link to={`/courses/${course.id_pk}/${course.university_pk_fk}/delete`}>Delete Course</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ProfessorCoursesIndex
