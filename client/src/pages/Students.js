import { Link, Outlet } from 'react-router-dom'
import './style.css'


const Students = () => {
    return (
        <div className="container">
            <h2>Students</h2>
            <div id='student-headers'>
                <Link to='/students/all'>View Available Students</Link>
                <Link to='/students/register'>Register a Student</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Students
