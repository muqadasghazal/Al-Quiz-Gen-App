import React, { useState, useEffect } from 'react';
import NavbarTeacher from './NavbarTeacher';
import DOMPurify from 'dompurify';
import { json } from 'react-router-dom';
import Spinner from '../Spinner';
// In this component you will find create quiz code. Fetching code from backend and rendering in frontend

const TeacherDashboard = () => {
  const [createQuizCredentials, setcreateQuizCredentials] = useState({ topic: "", numberOfQuestions: "", typeOfQuestions: "MCQS" });
  const [jsonResponse, setJsonResponse] = useState({ quizHTML: "", quizName: "" });
  const [topicError, setTopicError] = useState("");
  const [load, setloading] = useState(false);

  const [questions, setQuestions] = useState([]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setcreateQuizCredentials({ ...createQuizCredentials, [name]: value });
  };
  useEffect(() => {
    console.log(jsonResponse);
  }, [jsonResponse]);


  //hanle on submit
  const handleOnSubmit = async () => {
    const topicWords = createQuizCredentials.topic.split(/\s+/);
    if (topicWords.length < 3) {
      setTopicError("Enter more than 3 words");
      return;
    }

    setTopicError("");
    let url = "http://localhost:4022/quiz/createQuiz"
    try {
      setloading(true)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          prompt: createQuizCredentials.topic,
          typeOfquestions: createQuizCredentials.typeOfQuestions,
          numberOfquestions: createQuizCredentials.numberOfQuestions
        }),
      });
      setloading(false)
      let Response = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      else {
        setJsonResponse({
          quizHTML: Response.finalRes,
          quizName: Response.name
        })
        console.log(jsonResponse);
      }

    } catch (error) {
      console.log("Error fetching quiz" + error)
    }
  }


  return (
    <>
      <NavbarTeacher />
      <div style={{ fontSize: '14px', lineHeight: '50px',backgroundColor:'rgb(31, 37, 51)',height:'100%',color:'white',padding:'20px' }} >
        {/* heading */}
        <div className='text-center' style={{ paddingTop: '50px' }}>
        <h2> <b>Generate Quizes like MCQS Here</b></h2>
        <h3> <b>Tell students Quiz Name generated to Join This Quiz</b></h3>

        </div>


        <div className='row' >
          {/* 1st column */}
          <div className='col-12 col-lg-6' style={{ padding: '30px' }}>
            <div className='row mb-3' >
              <b style={{ color: 'red' }}>{topicError}</b>
              <p className='p-0'>Enter topic and brief description of Quiz</p>
              <textarea style={{background:'rgb(31, 37, 51)',color:'white'}} className='border rounded' name="topic" id="" cols="30" rows="5" onChange={handleOnChange} required></textarea>
            </div>
            {/* 2nd row*/}
            <div className='row  mb-3'>
              <p className='p-0'>Number of Questions</p>
              <select style={{background:'rgb(31, 37, 51)' , color:'white'}} className='border rounded' name="numberOfQuestions" id="" onChange={handleOnChange} value={createQuizCredentials.numberOfQuestions}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

            </div>
            {/* 3rd row */}
            <div className='row mb-3' >
              <p className='p-0'>Types of Questions</p>
              <select style={{background:'rgb(31, 37, 51)', color:'white'}} className='border rounded' name="typeOfQuestions" id="" onChange={handleOnChange} value={createQuizCredentials.typeOfQuestions}>
                <option value="MCQS">MCQS</option>
              </select>
            </div>
            <div className='row justify-content-center'>
              <button onClick={handleOnSubmit} type="button" className="btn btn-success">Submit</button>
            </div>
          </div>

          {/* 2nd column */}
          <div className='col-12 col-lg-6' style={{ padding: '30px', fontWeight: '500' }}>
            {/* you can allow students to join quiz using this quiz name */}
            <span> Students can join this Quiz using this quiz name</span>
            <span style={{ fontFamily: 'sans-serif' }}> <b>{jsonResponse.quizName}</b></span>


            {/* questions */}
            {load && <Spinner />}
            <div
              className="quiz-container"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(jsonResponse.quizHTML) }}>
            </div>
          </div>

        </div>

      </div>

    </>
  );
};

export default TeacherDashboard;
