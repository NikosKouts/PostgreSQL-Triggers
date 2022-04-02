import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

const ProfessorDelete = () => {
    const { university } = useParams()
    const [universities, setUniversities] = useState([])
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8080/universities/${university}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => setUniversities(data))
    }, [university])
    



    return (
        <>
            <h2> {universities.name_pk ? `Deleted University with ID: ${universities.name_pk}` : `Failed to Delete University with ID: ${university}`}</h2>
        
        </>
    )
}

export default ProfessorDelete
