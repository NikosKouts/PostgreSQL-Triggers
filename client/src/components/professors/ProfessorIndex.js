import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const ProfessorIndex = () => {
    const [professors, setProfessors] = useState([])
    const { university, professor } = useParams()
    let header

    if(!professor){
        header = 'Available Professors'
    }
    else {
        header = `Professor's Information with ID: ${professor}`
    }

    useEffect(() => {
        if(!university){
            if(!professor){
                fetch(`http://127.0.0.1:8080/professors/all`)
                .then(response => response.json())
                .then(data => setProfessors(data));
            }
            else {
                fetch(`http://127.0.0.1:8080/professors/${professor}`)
                .then(response => response.json())
                .then(data => setProfessors(data));       
            }
        }
        else {
            fetch(`http://127.0.0.1:8080/universities/${university}/professors`)
            .then(response => response.json())
            .then(data => setProfessors(data))
            .catch(error => {
                return
            })
        }
    }, [university, professor])

    if(!university){
        return (
            <>
                <h3>{header}</h3> 
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-Mail</th>
                            <th>Phone</th>
                            <th>Specialty</th>
                            <th>Universtity</th>
                            <th>Experience (Years)</th>
                            <th>Salary</th>
                            <th>Courses</th>
                            <th>Delete Professor</th>
                        </tr>
                        
                        {professors.map(professor => {
                            return (
                                <tr key={professor.id_pk}>
                                    <td>{professor.id_pk}</td>
                                    <td>{professor.first_name}</td>
                                    <td>{professor.last_name}</td>
                                    <td>{professor.email}</td>
                                    <td>{professor.phone}</td>
                                    <td>{professor.specialty}</td>
                                    <td>{professor.university_fk}</td>
                                    <td>{professor.experience}</td>
                                    <td>{professor.salary}</td>
                                    <td><Link to={`/professors/${professor.id_pk}/courses`}>Show Courses</Link></td>
                                    <td><Link to={`/professors/${professor.id_pk}/delete`}>Delete Professor</Link></td>
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
                <h2>Professors Working at {university}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-Mail</th>
                            <th>More Information</th>
                        </tr>
                        
                        {professors.map(professor => {
                            return (
                                <tr key={professor.id_pk}>
                                    <td >{professor.id_pk}</td>
                                    <td >{professor.first_name}</td>
                                    <td >{professor.last_name}</td>
                                    <td >{professor.email}</td>
                                    <td><Link to={`/professors/${professor.id_pk}`}>Show More Information</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }
    
}

export default ProfessorIndex
