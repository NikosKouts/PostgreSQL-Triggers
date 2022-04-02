import {Link, Outlet} from 'react-router-dom'
import './Universities.css'
const Universities = () => {
    return (
        <div className='container'>
            <h2>Universities</h2>
            <div id='university-headers'>
                <Link to='/universities/all'>View Available Universities</Link>
                <Link to='/universities/register'>Register a University</Link>
            </div>

            <Outlet />
        </div>
    )
}

export default Universities
