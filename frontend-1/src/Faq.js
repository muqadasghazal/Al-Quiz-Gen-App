
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarTeacher from './Components/Teacher/NavbarTeacher';
import NavbarStudent from './Components/Student/NavbarStudent';


const Faq = () => {
    const [faqs, setFaqs] = useState([]);
    const { userType } = useParams();


    const getclientQuestions = async () => {
        const url = "http://localhost:4022/faq";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const responseData = await response.json();
            // Update the state with the response data
            setFaqs(responseData);
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        getclientQuestions();
    }, []); // Empty dependency array to run the effect once

    return (
        <>
            {userType === 'teacher' ? <NavbarTeacher /> : <NavbarStudent />}
            <div style={{ backgroundColor: 'rgb(31, 37, 51)', height: '100%', color: 'white', paddingTop: '50px' }}>

                <h2 className='text-center'> <b>Frequently Asked Questions</b> </h2>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            {/* accordion */}
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                {faqs.map((faq, index) => (
                                    <div className="accordion-item mt-3" key={index}>
                                        <h2 className="accordion-header" id={`flush-heading${index}`}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`} 
                                            style={{ backgroundColor: 'rgb(31, 37, 51)', color: 'white',fontSize:'13px'}}>
                                                {faq.question}
                                            </button>
                                        </h2>
                                        <div id={`flush-collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${index}`} data-bs-parent="#accordionFlushExample">
                                            <div className="accordion-body" style={{ color: '#c6c6cb', backgroundColor: 'rgb(31 37 51 / 96%)', padding: '35px 20px', fontSize: '13px' }}>
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default Faq

{/* {faqs.map(faq => (
    <div className='dropdown' key={faq.question}>
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {faq.question}
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
    <p className="dropdown-item" type="button">{faq.answer}</p>
    </div>
    </div>

))} */} 