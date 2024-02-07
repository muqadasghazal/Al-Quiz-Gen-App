import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NavbarStudent = () => {
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login/student')
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to=" "> <span style={{ fontSize: '20px' }}><b>AI QuizGen <span style={{ color: '#56ccf2' }}>app</span> </b></span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" to="/studentDashboard">Join Quiz</Link>
              </li>
             
              <li class="nav-item">
                <Link class="nav-link" to="/quizesGiven">Given Quizes</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/aboutStudent">About</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/faq/student">Faq</Link>
              </li>
            </ul>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarStudent
