import {Link, Outlet} from 'react-router-dom'
import './style.css'
const Professors = () => {
    return (
        <div className='container'>
            <h2>Professors</h2>
            <div id='professor-headers'>
                <Link to='/professors/all'>View Available Professors</Link>
                <Link to='/professors/register'>Register a Professor</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Professors
