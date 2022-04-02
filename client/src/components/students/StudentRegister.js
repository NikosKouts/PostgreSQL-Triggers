import { useState } from "react";

const StudentRegister = () => {
    const [id, setId] = useState([]);
    const [student_id, setStudent_id] = useState([]);
    const [first_name, setFirst_name] = useState([]);
    const [last_name, setLast_name] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [semester, setSemester] = useState([]);
    const [gpa, setGpa] = useState([]);
    const [university, setUniversity] = useState([]);



    const submit = (event) => {
        event.preventDefault();

        fetch('http://127.0.0.1:8080/students/register', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'id': id,
                'student_id': student_id,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'phone': phone,
                'semester': semester,
                'gpa': gpa, 
                'university': university 
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    return (
        <>
            <h3>Register a Student</h3>
            <form onSubmit={submit} id='form'>
                <div id="student-register-form">
                    <div>
                        <label>ID</label><br/>
                        <input type="text" value={id} onChange={(event) => setId(event.target.value)}/>
                    </div>
                    <div>
                        <label>Student ID</label><br/>
                        <input type="text" value={student_id} onChange={(event) => setStudent_id(event.target.value)}/>
                    </div>
                    <div>
                        <label>First Name</label><br/>
                        <input type="text" value={first_name} onChange={(event) => setFirst_name(event.target.value)}/>
                    </div>
                    <div>
                        <label>Last Name</label><br/>
                        <input type="text" value={last_name} onChange={(event) => setLast_name(event.target.value)}/>
                    </div>
                    <div>
                        <label>E-Mail</label><br/>
                        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div>
                        <label>Phone</label><br/>
                        <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)}/>
                    </div>
                    <div>
                        <label>Semester</label><br/>
                        <input type="text" value={semester} onChange={(event) => setSemester(event.target.value)}/>
                    </div>
                    <div>
                        <label>GPA</label><br/>
                        <input type="text" value={gpa} onChange={(event) => setGpa(event.target.value)}/>
                    </div>
                    <div>
                        <label>University</label><br/>
                        <input type="text" value={university} onChange={(event) => setUniversity(event.target.value)}/>
                    </div>
                </div>
                <input id='submit' type="submit"/>
            </form>
        </>
    )
}

export default StudentRegister
