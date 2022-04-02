import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const UniversityIndex = () => {
    const [universities, setUniversities] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8080/universities/all')
        .then(response => response.json())
        .then(data => setUniversities(data))
        .catch(error => {

        })
    }, [])


    return (
        <>
            <h3>Available Universities</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Region</th>
                        <th>Professors</th>
                        <th>Students</th>
                        <th>Courses</th>
                        <th>Delete University</th>
                    </tr>
                    
                    {universities.map(university => {
                        return (
                            <tr key={university.name_pk}>
                                <td >{university.name_pk}</td>
                                <td >{university.country}</td>
                                <td >{university.region}</td>
                                <td ><Link to={`/universities/${university.name_pk}/professors`}>View Professors ({university.professors})</Link></td>
                                <td ><Link to={`/universities/${university.name_pk}/students`}>View Students ({university.students})</Link></td>
                                <td ><Link to={`/universities/${university.name_pk}/courses`}>View Courses ({university.courses})</Link></td>
                                <td ><Link to={`/universities/${university.name_pk}/delete`}>Delete</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default UniversityIndex
