import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './App.css';

//Basic Pages
import Universities from './pages/Universities';
import Professors from './pages/Professors';
import Students from './pages/Students';
import Courses from './pages/Courses';

// University Components
import UniversityIndex from './components/universities/UniversityIndex'
import UniversityRegister from './components/universities/UniversityRegister'
import UniversityDelete from './components/universities/UniversityDelete'
import UniversityCoursesIndex from './components/universities/courses/UniversityCoursesIndex'

// Students Components
import StudentIndex from './components/students/StudentIndex';
import StudentRegister from './components/students/StudentRegister';
import StudentDelete from './components/students/StudentDelete';

// Student Attends Courses
import StudentAttendsCourses from './components/students/courses/StudentAttendsCourses';
import StudentRegisterCourses from './components/students/courses/SudentRegisterCourses';
import StudentRemoveCourses from './components/students/courses/StudentRemoveCourses';

// Professor Components
import ProfessorIndex from './components/professors/ProfessorIndex'
import ProfessorDelete from './components/professors/ProfessorDelete';
import ProfessorRegister from './components/professors/ProfessorRegister'
import ProfessorCoursesIndex from './components/professors/courses/ProfessorCoursesIndex';


// Courses Components
import CoursesIndex from './components/courses/CoursesIndex';
import CourseRegister from './components/courses/CourseRegister';
import CourseDelete from './components/courses/CourseDelete';
import CourseStudentsIndex from './components/courses/CourseStudentsIndex';




function App() {
  return (
    <Router>
      <div className="App">
        <h1>University Database Project</h1>
      </div>

      <nav id='nav-bar'>
        <Link to='/universities' className='nav-bar-item'>Universities</Link>
        <Link to='/professors' className='nav-bar-item'>Professors</Link>
        <Link to='/students' className='nav-bar-item'>Students</Link>
        <Link to='/courses' className='nav-bar-item'>Courses</Link>
      </nav>
      
      <Routes>
        <Route path='/universities' element={<Universities />}>
          <Route path='/universities/all' element={<UniversityIndex />}/>
          <Route path='/universities/register' element={<UniversityRegister />}/>
          <Route path='/universities/:university/professors' element={<ProfessorIndex />}/>
          <Route path='/universities/:university/students' element={<StudentIndex />}/>
          <Route path='/universities/:university/courses' element={<UniversityCoursesIndex />}/>
          <Route path='/universities/:university/delete' element={<UniversityDelete />}/>
        </Route>
        <Route path='/professors' element={<Professors />}>
          <Route path='/professors/all' element={<ProfessorIndex />}/>
          <Route path='/professors/:professor' element={<ProfessorIndex />}/>
          <Route path='/professors/register' element={<ProfessorRegister />}/>
          <Route path='/professors/:professor/delete' element={<ProfessorDelete />}/>
          <Route path='/professors/:professor/courses' element={<ProfessorCoursesIndex />}/>
        </Route>
        <Route path='/students' element={<Students />}>
          <Route path='/students/all/' element={<StudentIndex />}/>
          <Route path='/students/:student/courses' element={<StudentAttendsCourses />}/>
          <Route path='/students/:student' element={<StudentIndex />} />
          <Route path='/students/register/' element={<StudentRegister />}/>
          <Route path='/students/:student/courses/register' element={<StudentRegisterCourses />} />
          <Route path='/students/:student/delete' element={<StudentDelete />}/>
          <Route path='/students/:student/courses/remove' element={<StudentRemoveCourses />} />
        </Route>
        <Route path='/courses' element={<Courses />}>
          <Route path='/courses/all' element={<CoursesIndex />}/>
          <Route path='/courses/professors' element={<CoursesIndex />}/>
          <Route path='/courses/register' element={<CourseRegister />}/>
          <Route path='/courses/:course/:university/students' element={<CourseStudentsIndex />}/>
          <Route path='/courses/:course/:university/delete' element={<CourseDelete />}/>
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
