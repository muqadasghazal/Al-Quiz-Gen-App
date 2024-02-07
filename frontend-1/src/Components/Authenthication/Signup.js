import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ userName: "", email: "", password: "" });
  const [validate, setValidate] = useState("");
  const { userType } = useParams();

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleOnSubmit = async () => {
    console.log(userType)
    if (userType === "teacher") {
      console.log("signING UP  teacher")
      const { userName, email, password } = credentials;
      // Validate email format using a regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordPattern = /^(?=.*[0-9]).{8,}$/; // Adjust this regex as needed

      if (!userName || !email || !password) {
        setValidate("Please fill in all fields");
      } else if (!emailPattern.test(email)) {
        setValidate("Please enter a valid email address");
      } else if (!passwordPattern.test(password)) {
        setValidate("Password must contain at least one number and be at least 8 characters long");
      } else {
        // Proceed with the form submission
        const url = "http://localhost:4022/auth/teacher/createTeacher";
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userName,
              email,
              password,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            
          }

          const jsonResponse = await response.json();
          if (jsonResponse.errors) {
            setValidate("Please enter valid details");
          } else {
            setValidate("");
            navigate(`/login/${userType}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    else if (userType === "student") {
      console.log("signing up student")

      const { userName, email, password } = credentials;

      // Validate email format using a regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordPattern = /^(?=.*[0-9]).{8,}$/; // Adjust this regex as needed

      if (!userName || !email || !password) {
        setValidate("Please fill in all fields");
      } else if (!emailPattern.test(email)) {
        setValidate("Please enter a valid email address");
      } else if (!passwordPattern.test(password)) {
        setValidate("Password must contain at least one number and be at least 8 characters long");
      }else {
        // Proceed with the form submission
        const url = "http://localhost:4022/auth/student/createStudent";
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userName,
              email,
              password,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const jsonResponse = await response.json();
          if (jsonResponse.errors) {
            setValidate("Please enter valid details");
          } else {
            setValidate("");
            navigate(`/login/${userType}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };


  return (
    <>
      <html style={{ height: '100%' }}>
        <body style={{ height: '100%', margin: 0, display: 'flex', flexDirection: 'column' }}>
          <div className='row' style={{ flex: 1 }}>
            {/* Blue part (1st child) */}
            <div
              className='slidetoleft col-12 col-lg-6 d-none d-lg-block'
              style={{
                backgroundColor: 'rgb(31, 37, 51',
                paddingLeft: '30px',
                paddingTop: '10px',
                minHeight: '100vh', // Set minimum height to fill the viewport
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Vertically center content
              }}
            >


              <h1 style={{ color: 'white', fontSize: '40px', fontWeight: '700', marginTop: '200px' }}>
              AI QuizGen <span style={{ color: '#56ccf2' }}>app</span>
              </h1>

              <p style={{ color: 'white', fontSize: '35px', fontWeight: '300' }}>
                Join Us Today!
              </p>
              <p style={{ fontSize: '18px', fontWeight: '200',color: 'white', }}>
                - Explore a world of interactive quizzes and personalized learning.
              </p>
              <p style={{ fontSize: '18px', fontWeight: '200',color: 'white', }}>
                - Enhance your knowledge with quizzes designed using the latest AI technologies.
              </p>
              <p style={{ fontSize: '18px', fontWeight: '200',color: 'white' }}>
                - Join a community of learners and educators passionate about education.
              </p>
              <p style={{ color: 'white', fontWeight: '700', textAlign:'center' }}>
               Signup Here! 👉🏻
              </p>

            </div>

            {/* Red part (2nd child) */}
            <div
              className='slidetoright col-12 col-lg-6 col shadow-lg mx-sm-10'
              style={{
                minHeight: '100vh', // Set minimum height to fill the viewport
                paddingTop: '60px',
                paddingLeft: '30px',
                borderRadius: '20px' // Add padding
              }}
            >
              <div>
                <p className='text-center' style={{ fontSize: '30px', fontWeight: '700' }}>
                  Registration
                </p>
                <p className='text-center' style={{ fontSize: '25px', fontWeight: '500', color: 'green' }}>
                  {validate}
                </p>


                {/* form */}
                <>
                  <div className="mb-3 row" style={{ marginTop: '80px', fontSize: '20px' }}>
                    <label htmlFor="userName" className="col-sm-2 col-form-label">
                      Name
                    </label>
                    <div className="col-sm-9" >
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        placeholder="Write your name here"
                        onChange={handleOnChange}
                        value={credentials.userName}
                        required />
                    </div>
                  </div>
                  <div className="mb-3 row" style={{ fontSize: '20px' }}>
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-9" >
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Write your email here"
                        onChange={handleOnChange}
                        value={credentials.email}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row" style={{ fontSize: '20px' }}>
                    <label htmlFor="password" className="col-sm-2 col-form-label">
                      Password
                    </label>
                    <div className="col-sm-9 ml-10">
                      <input type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Write your password here"
                        onChange={handleOnChange}
                        value={credentials.password}
                        required
                        style={{
                          border: '1px solid #80808042',
                          padding: '10px'
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary text-center" onClick={handleOnSubmit} style={{ borderRadius: '20px', padding: '10px 50px 10px 50px', fontSize: '20px' }}>Sign Up</button>
                    <Link to={`/login/${userType}`}><p className='alreadyHaveAnAccount' style={{ opacity: '0.5', marginTop: '20px', cursor: 'pointer', fontSize: '20px', color: 'gray' }}>Already Have an Account? Login</p></Link>
                  </div>
                </>

              </div>
            </div>
          </div>
        </body>
      </html>


    </>
  );
}

export default Signup
