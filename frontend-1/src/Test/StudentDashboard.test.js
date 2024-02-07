import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import StudentDashboard from '../Components/Student/StudentDashboard'; // Adjust the import path as necessary
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';

fetchMock.enableMocks();
// quizName: 2wBqQ

beforeEach(() => {
  fetch.resetMocks();
});

it('fetches and displays quiz data upon submission', async () => {
  const mockQuizResponse = {
    numberOfQuestions: 4,
    typeofquiz: 'MCQS',
    teacherName: 'Ghazala',
  };

  // Mock the fetch call
  fetch.mockResponseOnce(JSON.stringify(mockQuizResponse));

  render(
    <Router>
      <StudentDashboard />
    </Router>
  );

  // Simulate user input and submission
  const input = screen.getByPlaceholderText('Enter Quiz Name here');
  fireEvent.change(input, { target: { value: 'Sample Quiz' } });
  fireEvent.click(screen.getByText('Submit'));

  // Wait for the component to update based on the mock fetch response
  await waitFor(() => {
    expect(screen.getByText('Number of Questions: 4')).toBeInTheDocument();
    expect(screen.getByText('Teacher Name: Ghazala')).toBeInTheDocument();
  });
});
