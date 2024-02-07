import React, { useEffect, useState } from 'react'
import NavbarStudent from './NavbarStudent'
import DOMPurify from 'dompurify';
import Spinner from '../Spinner';
import Swal from 'sweetalert2'


const StudentDashboard = () => {
  const [quizName, setquizName] = useState("");
  const [credentials, setcredentials] = useState({ questionsCode: "", teacherName: "", typeOfQuiz: "", numberofQuestions: "", quizId: "" })
  const [load, setloading] = useState(false);
  const [topicError, setTopicError] = useState("");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState({ scores: "", wrongAnswers: "" });

  const sweetAlert = () => {
    Swal.fire({
      title: 'You can join a quiz by submitting the quiz name in the field given.',
      text: 'Make sure to not to make any spell mistake.Quiz will be showing beneath! Best of Luck!🙌',
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }
  const sweetAlert2=(responseData)=>{
    Swal.fire({
      title: `${responseData.scores}<${credentials.numberofQuestions}` ? `Better Luck next Time` : `Excellent`,
      text: `Your scores are ${responseData.scores} and wrongs are ${responseData.wrongAnswers}`,
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }


  const handleOnChange = (event) => {
    event.preventDefault()
    setquizName(event.target.value);
  };

  useEffect(() => {
    sweetAlert();
  }, []);

  const handleAnswersChange = (index, value) => {
    const updatedAnswers = { ...answers, [`ans${index + 1}`]: value };
    setAnswers(updatedAnswers);
  }

  const calculateScore = async () => {
   const url = "http://localhost:4022/quiz/calculateScore";
    const requestedBody = {
      quizid: credentials.quizId,
      ...answers
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(requestedBody)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      // Update the state with the response data
      setResult({
        scores: responseData.scores,
        wrongAnswers: responseData.wrongAnswers
      });
      console.log(responseData)
      sweetAlert2(responseData);
      
    } catch (error) {
      console.error(error);
    }
  }
  



  const handleOnSubmit = async () => {
    if (quizName.length < 5) {
      setTopicError("Enter 5 letters of quizname");
      return;
    }
    setloading(true)
    let url = `http://localhost:4022/quiz/studentGetquiz/${quizName}`
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      });
      let Response = await response.json();
      setloading(false)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`) && setTopicError("enter valid quiz Name")
      }
      else {
        setcredentials({
          questionsCode: Response.questions,
          numberofQuestions: Response.numberOfQuestions,
          typeOfQuiz: Response.typeofquiz,
          teacherName: Response.teacherName,
          quizId: Response.quizId
        })
        setTopicError("")
        console.log(credentials);
      }

    } catch (error) {
      setTopicError("Enter valid quiz name")
      setloading(false)
      setcredentials("")
      console.log("Eroor fetching quiz" + error)
    }
  }
  return (
    <>
      <NavbarStudent />
      <div style={{
        backgroundColor: 'rgb(31, 37, 51)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',  // Use flexbox to arrange children horizontally
        flexDirection: 'column',  // Arrange children in a column
      }}>

        <div className="container text-center lh-lg" style={{ marginTop: '30px' }}>
          <h3 > <b>Welcome to Quiz Gen app as a Student </b> </h3>
          <p style={{ color: 'red' }}>{topicError}</p>
          <div className="mt-3">
            <input
              type="text"
              onChange={handleOnChange}
              value={quizName}
              placeholder="Enter Quiz Name here"
              className="border rounded mx-2"
              required
              style={{
                padding: '5px',
                fontSize: '14px',
                backgroundColor: 'aliceblue',
                color: 'black'
              }}
            />
            <button className="btn btn-primary" onClick={handleOnSubmit}>
              Submit
            </button>
          </div>
        </div>

        {/* show quiz */}
        <div className="row" style={{ fontSize: '14px', marginLeft: '3px', display: 'flex' }}>
          <div className='col-12 col-lg-6 p-4'>
            <p style={{ color: 'white', fontWeight: 'bold' }}>  Number of Questions: {credentials.numberofQuestions}</p>
            <p style={{ color: 'white', fontWeight: 'bold' }} >Teacher Name: {credentials.teacherName}</p>
            <p style={{ color: 'white', fontWeight: 'bold' }} >Quiz type : {credentials.typeOfQuiz}</p>
            {load && <Spinner />}
            <div
              className=""
              style={{ fontSize: '14px' }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(credentials.questionsCode) }}>
            </div>
          </div>

          {/* answers div */}
          <div className='col-12 col-lg-6 p-4'>
            {Array.from({ length: credentials.numberofQuestions }).map((_, index) => (
              <React.Fragment key={index}>
                <input key={index}
                  style={{
                    padding: '5px',
                    fontSize: '14px',
                    backgroundColor: 'aliceblue',
                    color: 'black'
                  }}
                  value={answers[`ans${index + 1}`] || ''} // Assuming answers is an object in state
                  onChange={(e) => handleAnswersChange(index, e.target.value)}
                  placeholder={`Answer for Question ${index + 1}`}
                  className='border rounded my-2'
                />
                <br />
              </React.Fragment>
            ))}
            <button className='btn btn-success' style={{ padding: '5px 20px 5px 20px' }} onClick={calculateScore}>Save</button>
          </div>
          {/* store answers in array.. and then pass that to /calculateScore... you will be receiving something from calculateScore... show it in sweetalert in beautiful manner. */}
        </div>
      </div>
    </>
  )
}

export default StudentDashboard
