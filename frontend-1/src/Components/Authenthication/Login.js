import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const { userType } = useParams();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [validate, setValidate] = useState("");


  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (userType === "teacher") {
      console.log("login teacher")

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!credentials.email || !credentials.password) {
        setValidate("Please fill in both email and password");
      } else if (!emailPattern.test(credentials.email)) {
        setValidate("Please enter a valid email address");
      } else {
        const url = "http://localhost:4022/auth/teacher/login";
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`) && setValidate('You are not registered ');
          }

          const jsonResponse = await response.json();
          localStorage.setItem("token", jsonResponse.token);
          navigate("/teacherDashboard");
        } catch (error) {
          console.error(error);
        }
      }
    }
    else {
      console.log("login student")

      const { email, password } = credentials;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !password) {
        setValidate("Please enter all fields")
      }
      //fi email pattern and email that user enters doesnt match then..
      else if (!emailPattern.test(email)) {
        setValidate("Please enter valid email")
      }
      else {
        const url = "http://localhost:4022/auth/student/login";
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} `) && setValidate("You're not registered");
          }
          const data = await response.json(); // Parse the response as JSON

          // Assuming your server returns a token in the response
          const token = data.token;
          
          localStorage.setItem("token", token);
          navigate('/studentDashboard')
        } catch (error) {

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
                backgroundColor: 'rgb(31, 37, 51)',
                paddingLeft: '30px',
                paddingTop: '10px',
                minHeight: '100vh', // Set minimum height to fill the viewport
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
               // Vertically center content
              }}
            >


              <h1 style={{ color: 'white', fontSize: '50px', fontWeight: '700', marginTop: '200px' }}>
                AI QuizGen App
              </h1>

              <p style={{ color: 'white', fontWeight: '300',marginTop:'40px' }}>
                Explore the world of AI-powered quizzes and enhance your learning experience.
                AI QuizGen App brings you interactive quizzes created with the latest AI technologies.
              </p>

              <p style={{ color: 'white', fontWeight: '300' }}>
                Challenge yourself, improve your knowledge, and have fun while doing it!
              </p>
              <p style={{ color: 'white', fontWeight: '700', textAlign:'center' }}>
                Login Here! 👉🏻
              </p>

            </div>

            {/*(2nd child) */}
            <div
              className='slidetoright col-12 col-lg-6 col shadow-lg mx-sm-10'
              style={{
                minHeight: '100vh', // Set minimum height to fill the viewport
                paddingTop: '60px',
                paddingLeft: '30px',
                borderRadius: '20px',
                lineHeight:'60px' // Add padding
              }}
            >
              <div>
                <p className='text-center' style={{ fontSize: '25px', fontWeight: '700' }}>
                  Login
                </p>
                <p className='text-center' style={{ fontSize: '25px', fontWeight: '500', color: 'green' }}>
                  {validate}
                </p>


                {/* form */}
                <>

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
                        value={credentials.email}
                        placeholder="Write your email here"
                        style={{
                          border: '1px solid #80808042',
                          padding: '10px'
                        }}
                        onChange={handleOnChange}
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
                        value={credentials.password}
                        onChange={handleOnChange} style={{
                          border: '1px solid #80808042',
                          padding: '10px'
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary text-center" onClick={handleOnSubmit} style={{ borderRadius: '20px', padding: '10px 50px 10px 50px', fontSize: '20px' }}>Login</button>
                  </div>
                </>

              </div>
            </div>
          </div>
        </body>
      </html>



    </>
  )

}

export default Login
