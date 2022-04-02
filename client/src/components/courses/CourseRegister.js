import { useState } from "react";


const CourseRegister = () => {
    const [course_id, setCourse_id] = useState([]);
    const [course_name, setCourse_name] = useState([]);
    const [university, setUniversity] = useState([]);
    const [professor, setProfessor] = useState([]);

    const submit = (event) => {
        event.preventDefault();

        fetch('http://127.0.0.1:8080/courses/register', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'id': course_id,
                'name': course_name,
                'university': university,
                'professor': professor 
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }


    return (
        <>
            <h3>Register a Course</h3>
            <form onSubmit={submit} id='form'>
                <div id="course-register-form">
                    <div>
                        <label>Course ID</label><br/>
                        <input type="text" value={course_id} onChange={(event) => setCourse_id(event.target.value)}/>
                    </div>
                    <div>
                        <label>Course Name</label><br/>
                        <input type="text" value={course_name} onChange={(event) => setCourse_name(event.target.value)}/>
                    </div>
                    <div>
                        <label>University</label><br/>
                        <input type="text" value={university} onChange={(event) => setUniversity(event.target.value)}/>
                    </div>
                    <div>
                        <label>Professor</label><br/>
                        <input type="text" value={professor} onChange={(event) => setProfessor(event.target.value)}/>
                    </div>
                </div>
                <input id='submit' type="submit"/>
            </form>
        </>
    )
}

export default CourseRegister
