import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const NavbarTeacher = () => {
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login/teacher')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to=" "> <span style={{ fontSize: '20px' }}><b>AI QuizGen <span style={{ color: '#56ccf2' }}>app</span> </b></span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/teacherDashboard">CreateQuiz</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/generatedQuizforTeacher">GeneratedQuiz</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/resultForTeacher">Results</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutTeacher">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faq/teacher">Faq</Link>
              </li>
            </ul>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>


          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarTeacher
