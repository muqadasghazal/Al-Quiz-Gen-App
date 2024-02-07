import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import QuizesGiven from '../Components/Student/QuizesGiven'; // Adjust the import path as necessary
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';

fetchMock.enableMocks();
// muqadas
beforeEach(() => {
  fetch.resetMocks();
});

it('displays given quizzes', async () => {
  const mockQuizzes = [
    { quizName: 'tTJOE', teacherName: 'Sir Sajid Qureshi', numberOfQuestions: 4, score: 3 },
    // ... other mock quizzes
  ];

  fetch.mockResponseOnce(JSON.stringify({ transformedData: mockQuizzes }));

  render(
    <Router>
      <QuizesGiven />
    </Router>
  );

  await waitFor(() => {
    mockQuizzes.forEach((quiz) => {
      expect(screen.getByText(quiz.quizName)).toBeInTheDocument();
      expect(screen.getByText(quiz.teacherName)).toBeInTheDocument();
      expect(screen.getByText(quiz.numberOfQuestions.toString())).toBeInTheDocument();
      expect(screen.getByText(quiz.score.toString())).toBeInTheDocument();
    });
  });
});
