import {Link, Outlet} from 'react-router-dom'
import './style.css'


const Courses = () => {
    return (
        <div className='container'>
            <h2>Courses</h2>
            <div id='courses-headers'>
                <Link to='/courses/all'>View Available Courses</Link>
                <Link to='/courses/register'>Register a Course</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Courses
