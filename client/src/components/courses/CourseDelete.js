import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'


const CourseDelete = () => {
    const { course, university } = useParams()
    const [deletedCourse, setDeletedCourse] = useState([])
    
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8080/courses/${course}/${university}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => setDeletedCourse(data))
    }, [course, university])
    

    return (
        <>
            <h2> {deletedCourse.id_pk ? `Deleted Course with ID: ${deletedCourse.id_pk}` : `Failed to Delete Course with ID: ${course}`}</h2>
        </>
    )
}

export default CourseDelete
