import { useState } from "react";


const ProfessorRegister = () => {
    const [id, setId] = useState([]);
    const [first_name, setFirst_name] = useState([]);
    const [last_name, setLast_name] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [experience, setExperience] = useState([]);
    const [salary, setSalary] = useState([]);
    const [specialty, setSpecialty] = useState([]);
    const [university, setUniversity] = useState([]);



    const submit = (event) => {
        event.preventDefault();

        fetch('http://127.0.0.1:8080/professors/register', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'id': id,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'phone': phone,
                'experience': experience,
                'salary': salary, 
                'specialty': specialty,
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
            <h3>Register a Professor</h3>
            <form onSubmit={submit} id='form'>
                <div id="professor-register-form">
                    <div>
                        <label>ID</label><br/>
                        <input type="text" value={id} onChange={(event) => setId(event.target.value)}/>
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
                        <label>Experience</label><br/>
                        <input type="text" value={experience} onChange={(event) => setExperience(event.target.value)}/>
                    </div>
                    <div>
                        <label>Salary</label><br/>
                        <input type="text" value={salary} onChange={(event) => setSalary(event.target.value)}/>
                    </div>
                    <div>
                        <label>Specialty</label><br/>
                        <input type="text" value={specialty} onChange={(event) => setSpecialty(event.target.value)}/>
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

export default ProfessorRegister
