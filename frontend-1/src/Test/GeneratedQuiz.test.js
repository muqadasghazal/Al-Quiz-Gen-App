import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GeneratedQuiz from '../Components/Teacher/GeneratedQuiz';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';

fetchMock.enableMocks();
// for ghazala teacher

beforeEach(() => {
  fetch.resetMocks();
});

it('loads and displays quizzes', async () => {
  const mockResponseData = {
    extractedQuizData: [
      { quizName: "oUwkV", createdAt: "11/4/2023, 8:48:57 AM" },
      { quizName: "OVRoq", createdAt: "11/4/2023, 9:01:58 AM" },
      // ...more quizzes as needed
    ],
  };


  fetch.mockResponseOnce(JSON.stringify(mockResponseData));

  const { getByText } = render( 
  <Router>
    <GeneratedQuiz />
  </Router>);

  await waitFor(() => {
    // Verify that each quiz is rendered
    mockResponseData.extractedQuizData.forEach((quiz) => {
      expect(getByText(quiz.quizName)).toBeInTheDocument();
      expect(getByText(quiz.createdAt)).toBeInTheDocument();

      // Check for other details like createdAt or typeofquestions, if needed
    });
    
  });
});
