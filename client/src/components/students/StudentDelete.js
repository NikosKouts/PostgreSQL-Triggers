import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'


const StudentDelete = () => {
    const { student } = useParams()
    const [students, setStudents] = useState([])
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8080/students/${student}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => setStudents(data))
    }, [student])
    



    return (
        <>
            <h2> {students.id_pk_fk ? `Deleted Student with ID: ${students.id_pk_fk}` : `Failed to Delete Student with ID: ${student}`}</h2>
        </>
    )
}

export default StudentDelete
