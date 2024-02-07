import React, { useState, useEffect } from 'react';
import NavbarTeacher from './NavbarTeacher'

const ResultsTeacher = () => {
    const [result, setresults] = useState([]);

    const getResultsOfStudents = async () => {
        const url = "http://localhost:4022/score/getStudentsResult";
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
            setresults(responseData.data);
            console.log(responseData.data)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getResultsOfStudents();
    }, []);
    return (
        <>
            <NavbarTeacher />

            <div
                style={{
                    backgroundColor: '#1f2533',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh', // Update this line to cover the entire viewport
                    margin: 0, // Remove default margin
                    padding: 0, // Remove default padding
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
                    <b>Students Result</b>
                </p>

                <table className="container rounded shadow-lg " style={{
                    width: '70%',
                    margin: '0 auto',
                    borderCollapse: 'collapse',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    fontSize: '16px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <thead style={{ backgroundColor: '#242424' }}>
                        <tr>
                            <th scope="col" style={{ padding: '15px', fontSize: '16px', color: 'white' }}>Student Name</th>
                            <th scope="col" style={{ padding: '15px', fontSize: '16px', color: 'white' }}>Score</th>
                            <th scope="col" style={{ padding: '15px', fontSize: '16px', color: 'white' }}>Quiz Date</th>
                            <th scope="col" style={{ padding: '15px', fontSize: '16px', color: 'white' }}>Quiz Type</th>
                            <th scope="col" style={{ padding: '15px', fontSize: '16px', color: 'white' }}>Quiz Name</th>

                        </tr>
                    </thead>
                    <tbody>

                        {result.map((task, index) => {
                            //const createdAt = new Date(task.createdAtAt).toLocaleString();
                            const rowColor = index % 2 === 0 ? '#43baee' : 'white';
                            const date = new Date(task.quizDate).toLocaleString();

                            return (
                                <tr key={index} style={{ backgroundColor: rowColor }}>
                                    <td style={{ padding: '5px' }}>{task.studentName}</td>
                                    <td style={{ padding: '5px' }}>{task.score}</td>
                                    <td style={{ padding: '5px' }}>{date}</td>
                                    <td style={{ padding: '5px' }}>MCQS</td>
                                    <td style={{ padding: '5px' }}>{task.quizName}</td>



                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>

        </>
    )
}

export default ResultsTeacher
