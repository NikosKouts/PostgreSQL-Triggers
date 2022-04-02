import { useState } from "react";


const UniversityRegister = () => {
    const [name, setName] = useState([]);
    const [country, setCountry] = useState([]);
    const [region, setRegion] = useState([]);
        
    const submit = (event) => {
        event.preventDefault();
        if(!name || !country || !region)
            console.log('[ERROR]: Form Input Missing Parameters')
        else {
            fetch('http://127.0.0.1:8080/universities/register', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'name': name, 'country': country, 'region': region })
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
            <h3>Register a University</h3>
            <form onSubmit={submit}>
                <div id="university-register-form">
                    <div>
                        <label>Name</label> <br/>
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div>
                        <label>Country</label> <br/>
                        <input type="text" value={country} onChange={(event) => setCountry(event.target.value)}/>
                    </div>
                    <div>
                        <label>Region</label> <br/>
                        <input type="text" value={region} onChange={(event) => setRegion(event.target.value)}/>
                    </div>
                </div>
            <input type="submit" id="submit"/>
            </form>
        </>
    )
}

export default UniversityRegister
