import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

const ProfessorDelete = () => {
    const { professor } = useParams()
    const [professors, setProfessors] = useState([])
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8080/professors/${professor}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => setProfessors(data))
    }, [professor])
    



    return (
        <>
            <h2> {professors.id_pk_fk ? `Deleted Professor with ID: ${professors.id_pk_fk}` : `Failed to Delete Professor with ID: ${professor}`}</h2>
        
        </>
    )
}

export default ProfessorDelete
