import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ResultsTeacher from '../Components/Teacher/ResultsTeacher';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';

fetchMock.enableMocks();
// ghazala

beforeEach(() => {
  fetch.resetMocks();
});

it('fetches and displays student results', async () => {
  const mockResultsData = {
    data: [
      { studentName: "Muqadas", score: 1, quizDate: "11/4/2023, 8:48:57 AM", quizName: "oUwkV" },
      { studentName: "Muqadas", score: 1, quizDate: "11/4/2023, 9:01:58 AM", quizName: "OVRoq" },
      // ... other test data
    ],
  };

  fetch.mockResponseOnce(JSON.stringify(mockResultsData));

  render(
    <Router>
      <ResultsTeacher />
    </Router>
  );

  await waitFor(() => {
    // Check if the student names and other details are rendered
    mockResultsData.data.forEach((result) => {
      const studentNameElements = screen.getAllByText(result.studentName);
      expect(studentNameElements.length).toBeGreaterThan(0); // Check that there are matching elements for student name

      expect(screen.getByText(result.quizDate)).toBeInTheDocument();
      expect(screen.getByText(result.quizName)).toBeInTheDocument();
    });
  });
});
