import { useState } from 'react'
import { useParams } from 'react-router-dom';

const StudentRemoveCourses = () => {
    const [course, setCourse] = useState([]);
    const [university, setUniversity] = useState([]);
    const { student } = useParams();
    

    const submit = (event) => {
        event.preventDefault();
        if(!course || !university)
            console.log('[ERROR]: Form Input Missing Parameters')
        else {
            fetch(`http://127.0.0.1:8080/courses/${student}/${course}/${university}`, {
              method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error.message)
            })
        }
    }
    
    return (
        <>
            <h3>Select Course to Remove</h3>
            <form onSubmit={submit}>
                <div id="student-course-register-form">
                    <div>
                        <label>Course ID</label> <br/>
                        <input type="text" value={course} onChange={(event) => setCourse(event.target.value)}/>
                    </div>
                    <div>
                        <label>University</label> <br/>
                        <input type="text" value={university} onChange={(event) => setUniversity(event.target.value)}/>
                    </div>
                </div>
                <input type="submit" id="submit"/>
            </form>
        </>
    )
}

export default StudentRemoveCourses