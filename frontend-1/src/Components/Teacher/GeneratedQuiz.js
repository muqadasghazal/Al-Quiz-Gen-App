import React, { useState, useEffect } from 'react';
import NavbarTeacher from './NavbarTeacher'
import DOMPurify from 'dompurify';


const GeneratedQuiz = () => {
    const [teachergeneratedquiz, setteachergeneratedquiz] = useState([]);
    const [quizCode, setquizCode] = useState();

    let i;
    const scrollToQuiz = () => {
        const targetSection = document.getElementById('quiz');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    const getteachertasks = async () => {
        const url = "http://localhost:4022/quiz/generatedQuiz";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            // Update the state with the response data
            setteachergeneratedquiz(responseData.extractedQuizData);
        } catch (error) {
            console.error(error);
        }
    };

    const getQuiz = async (quizId) => {
        const url = `http://localhost:4022/quiz/getquizByCode/${quizId}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            // Update the state with the response data
            setquizCode(responseData.code);
            scrollToQuiz()
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getteachertasks();
    }, []);


    return (
        <>
            <NavbarTeacher />
            <body
                style={{
                    backgroundColor: '#1f2533',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%', // Update this line to cover the entire viewport
                    margin: 0, // Remove default margin
                    padding: 0, // Remove default padding
                }}
            >
                <div
                    style={{
                        paddingTop: '50px',
                        textAlign: 'center',
                        backgroundColor: '#1f2533',
                    }}
                >
                    <p
                        style={{
                            marginBottom: '20px',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold'
                        }}
                    >
                        <b>Generated Quizes till now</b>
                    </p>

                    <table className="container rounded shadow-lg " style={{
                        width: '70%',
                        margin: '0 auto',
                        borderCollapse: 'collapse',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        fontSize: '14px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <thead style={{ backgroundColor: '#242424' }}>
                            <tr>
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Quiz Name</th>
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Created At</th>
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Type of Questions</th>
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Quiz</th>

                            </tr>
                        </thead>
                        <tbody>

                            {teachergeneratedquiz.map((task, index) => {
                                //const createdAt = new Date(task.createdAtAt).toLocaleString();
                                const rowColor = index % 2 === 0 ? '#43baee' : 'white';
                                const date = new Date(task.createdAt).toLocaleString();

                                return (
                                    <tr key={index} style={{ backgroundColor: rowColor }}>
                                        <td style={{ padding: '5px' }}>{task.quizName}</td>
                                        <td style={{ padding: '5px' }}>{date}</td>
                                        <td style={{ padding: '5px' }}>MCQS</td>
                                        <td style={{ padding: '5px' }}>
                                            <button className='btn btn-primary' onClick={() => getQuiz(task.id)}>View Your Quiz</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                   
                </div>
                <div id="quiz" style={{color:'white'}}>
                <p
                        style={{
                           textAlign:'center',
                           marginTop:'50px',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold'
                        }}
                    >
                        <b>You can View Generated Quizes Here</b>
                    </p>
                        <div 
                            style={{marginLeft: '50px'}}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(quizCode) }}>
                        </div>
                    </div>
            </body>


        </>
    )
}


export default GeneratedQuiz