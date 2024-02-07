import React, { useState, useEffect } from 'react';
import NavbarStudent from './NavbarStudent'

const QuizesGiven = () => {
    const [givenQuizes, setGivenQuizes] = useState([]);

    const getGivenQuizes = async () => {
        const url = "http://localhost:4022/score/givenQuizesForStudents";
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
            setGivenQuizes(responseData.transformedData);
            console.log(givenQuizes)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getGivenQuizes();
    }, []);
    return (
        <>
            <NavbarStudent />
            <body
                style={{
                    backgroundColor: '#1f2533',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh', // Update this line to cover the entire viewport
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
                        <b>Given Quizes</b>
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
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Conducted on</th>
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Teacher Name</th>
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Type of Questions</th>
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Number of Questions</th>
                                <th scope="col" style={{ padding: '15px', fontSize: '14px', color: 'white' }}>Score</th>
                            
                            </tr>
                        </thead>
                        <tbody>

                            {givenQuizes.map((task, index) => {
                                //const createdAt = new Date(task.createdAtAt).toLocaleString();
                                const rowColor = index % 2 === 0 ? '#43baee' : 'white';
                                const date = new Date(task.createdAt).toLocaleString();

                                return (
                                    <tr key={index} style={{ backgroundColor: rowColor }}>
                                        <td style={{ padding: '5px' }}>{task.quizName}</td>
                                        <td style={{ padding: '5px' }}>{date}</td>
                                        <td style={{ padding: '5px' }}>{task.teacherName}</td>
                                        <td style={{ padding: '5px' }}>MCQS</td>
                                        <td style={{ padding: '5px' }}>{task.numberOfQuestions}</td>
                                        <td style={{ padding: '5px' }}>{task.score}</td>                              
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
            </body>
            {/* <button onClick={getGivenQuizes}>fetch</button> */}
        </>
    );
};
export default QuizesGiven

