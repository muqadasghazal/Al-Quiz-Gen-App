import React from 'react'
import NavbarTeacher from './Teacher/NavbarTeacher'

const About = () => {
  return (
    <>
      <NavbarTeacher />
      {/* body */}
      <section className="content-section" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundPosition: 'center center', backgroundAttachment: 'fixed', margin: '0', padding: '0' }}>

        <div className="text-center" style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold', padding: '10px', backgroundColor: '#0d6efd', color: 'white', borderRadius: '70px', display: 'inline-block', width: '30%', margin: '10px' }}>
            How this app works? Hey 👋, let's learn about it!
          </p>
        </div>

        <div className="shop-items">
          <div className="shop-item shop-item-e">
            <span className="section-header section-header-q"> <b>App description</b></span>
            <p>The Quiz Generation Web Application is a platform designed to facilitate the creation, management, and participation in quizzes for both students and teachers. The application provides a user-friendly interface that allows teachers to generate, organize, and distribute quizzes among their students, while students can access and take these quizzes.
            </p>
          </div>
          <div className="shop-item shop-item-d">
            <h3 className="section-header">Teacher's Dashboard</h3>
            <p>Teachers have access to a dashboard where they can create and manage quizes. They can create multiple-choice, true/false questions</p>

          </div>
          <div className="shop-item shop-item-c">
            <h3 className="section-header ">Students Access</h3>
            <p>Students have their own login area where they can join quiz by quiz Name, take them, and submit their answers within the specified time frame.</p>
          </div>

          <div className="shop-item shop-item-b">
            <h3 className="section-header">Real Time Results</h3>
            <p>Teachers can view and analyze real-time results of the quizzes, allowing them to assess student performance and understanding of the subject matter.</p>
            <h3 className="section-header">Authentication and security</h3>
            <p>The application ensures secure logins for both teachers and students, requiring valid credentials to access their respective areas.
            </p>
            <h3 className="section-header">Error handling and validation</h3>
            <p>The app has built-in error handling and validation processes to ensure that users provide correct and complete information during the sign-up and login processes.
            </p>
          </div>

          <div className="shop-item shop-item-a">
            <span className="section-header section-header-q">Primary Purpose</span>

            <p>
              The primary objective of the Quiz Generation Web Application is to offer an efficient platform for teachers to create quizzes and for students to easily access and complete these quizzes. It aims to streamline the process of generating and taking quizzes, providing an interactive and intuitive environment for both educators and learners.
            </p>
            <span className="section-header section-header-q">Targeted Audience</span>
            <p>
            This application caters to teachers who want to create quizzes for their students and students who need to access and complete these quizzes. It is suitable for various educational settings, including schools, colleges, and online learning platforms.

            </p>
          </div>
        </div>

      </section>

    </>

  )
}

export default About
