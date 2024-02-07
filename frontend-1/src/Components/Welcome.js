import React, { useState } from 'react';
import register from './images/register.png'
import { Link } from "react-router-dom";
import createQuiz from './images/createQuiz.png'
import viewQuiz from './images/viewQuiz.png'
import viewResult from './images/viewResult.png'
import GiveQuiz from './images/GiveQuiz.png'
import viewGivenQuizes from './images/viewGivenQuizes.png'



const Welcome = () => {
  const scrollToGuide = () => {
    const targetSection = document.getElementById('guide');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const scrollToContinue = () => {
    const targetSection = document.getElementById('continue');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }


  return (
    <>
      <div style={{
        backgroundColor: 'rgb(31, 37, 51)',
        color: 'white',
        height: '90%',
        width: '100vw',

      }}>
        {/* Navbar */}
        <div className='navbar navbar-expand-lg d-flex justify-content-between align-items-center nav-hover' style={{
          padding: '20px'
        }}>
          <p style={{ fontSize: '20px' }}><b>AI QuizGen <span style={{ color: '#56ccf2' }}>app</span> </b></p>
          <button className="btn btn-primary text-center" onClick={scrollToContinue} style={{ borderRadius: '20px', padding: '10px 20px 10px 20px', fontSize: '16px', cursor: 'pointer' }}>Continue</button>
        </div>

        {/* Body */}
        <div className='text-center' style={{ paddingTop: '80px', paddingBottom: '10px' }}>
          <h1> <b>Welcome to AI Quiz Generator App</b></h1>
          <p className='p-4' style={{ fontSize: '20px' }}> The Quiz Generation Web Application is a platform designed to facilitate the creation,
            management, and participation in quizzes <br /> for both students and teachers.The application
            provides a user-friendly interface that allows teachers to generate, <br /> organize, and distribute
            quizzes among their students, while students can access and take these quizzes.</p>
          <button className="btn btn-primary text-center" onClick={scrollToGuide} style={{ borderRadius: '20px', padding: '10px 20px 10px 20px', fontSize: '16px', cursor: 'pointer' }}>How to use this app</button>
        </div>

      </div>
      {/* step by step guide */}
      <div id="guide" className='text-center' style={{ paddingTop: '110px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h1> <b>Step By Step Guide</b></h1>
        <p className='p-4' style={{ fontSize: '20px' }}>
          Click on Continue as Teacher/Student , if your're Teacher/Student <br />
          1-Register Yourself as Teacher or Student
        </p>

        <div className="text-center">
          <img className='img-fluid' src={register} style={{ height: 'auto', maxWidth: '70%' }} />
        </div>
      </div>

      {/* guide for teacher */}
      <div className='text-center' style={{ paddingTop: '110px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h1> <b>Step By Step Guide For Teachers</b></h1>

        <section style={{ textAlign: 'center', marginTop: '50px' }}>
          <div style={{
            marginLeft: '50px',
            marginBottom: '50px',
          }}>
            
            <div style={{
              padding: '30px 60px',
              paddingTop: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around'

            }}>
              
              <div style={{ display: 'flex' }}>
                {/* step:3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{
                    fontWeight: 'bold',
                    display: 'block',
                  }}>Step 3:<br/>Create Quiz</span>

                  <img src={createQuiz} alt="create Quizzes Icon" style={{
                    width: '500px',
                    height: '300px',// Adjust the width as needed
                    borderRadius: '10px', // Adjust the border radius as needed
                    margin: '10px' // Adjust the margin as needed
                  }}/>

                </div>
                {/* step:4*/}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{
                    fontWeight: 'bold',
                    display: 'block'
                  }}>Step 4:<br></br>View Quizes</span>

                  <img src={viewQuiz} alt="View Quizzes Icon" style={{
                    width: '500px',
                    height: '300px', 
                    backgroundPosition:'center',// Adjust the width as needed
                    borderRadius: '10px', // Adjust the border radius as needed
                    margin: '10px' // Adjust the margin as needed
                  }}/>
                </div>
              </div>
              {/* step 5 */}
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{
                    fontWeight: 'bold',
                    display: 'block',
                  }}>STEP 5:<br></br>View Student's Result</span>
                  <img src={viewResult} alt="View student result Icon" style={{
                    height: '300px',
                    backgroundPosition:'center',// Adjust the width as needed
                    borderRadius: '10px', // Adjust the border radius as needed
                    margin: '10px' // Adjust the margin as needed
                  }}/>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>

       {/* guide for Students */}
       <div className='text-center' style={{ paddingTop: '110px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <h1> <b>Step By Step Guide For Students </b></h1>

        <section style={{ textAlign: 'center', marginTop: '50px' }}>
          <div style={{
            marginLeft: '50px',
            marginBottom: '50px',
          }}>
            
            <div style={{
              padding: '30px 60px',
              paddingTop: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around'

            }}>
              
              <div style={{ display: 'flex' }}>
                {/* step:3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{
                    fontWeight: 'bold',
                    display: 'block',
                  }}>Step 3:<br/>Give Quiz</span>

                  <img src={GiveQuiz} alt="create Quizzes Icon" style={{
                    width: '500px',
                    height: '300px',// Adjust the width as needed
                    objectFit:'contain',
                    margin: '10px', // Adjust the margin as needed
                    borderRadius:'10px'
                  }}/>

                </div>
                {/* step:4*/}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{
                    fontWeight: 'bold',
                    display: 'block'
                  }}>Step 4:<br></br>View Given Quizes</span>

                  <img src={viewGivenQuizes} alt="View Quizzes Icon" style={{
                    width: '500px',
                    height: '290px', 
                    borderRadius: '10px', // Adjust the border radius as needed
                    objectFit:'contain',
                    margin: '10px' // Adjust the margin as needed
                  }}/>
                </div>
              </div>
              
            </div>
          </div>
        </section>

      </div>

      {/* continue */}
      <div id="continue" className="d-flex justify-content-center align-items-center" style={{
        backgroundColor: 'rgb(31, 37, 51)',
        color: 'white',
        height: '300px',
        width: '100vw',

      }}>
        <Link to="/signup/teacher"><button className="btn btn-primary text-center me-3" style={{ borderRadius: '20px', padding: '10px 20px 10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Continue as Teacher
        </button></Link>

        <Link to="/signup/student"><button className="btn btn-primary text-center me-3" style={{ borderRadius: '20px', padding: '10px 20px 10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Continue as Student
        </button></Link>

      </div>

    </>
  );
};

export default Welcome;
