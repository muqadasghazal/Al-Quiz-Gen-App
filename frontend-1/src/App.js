import logo from './logo.svg';
import './App.css';
import Signup from './Components/Authenthication/Signup';
import Login from './Components/Authenthication/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from './Components/Student/StudentDashboard';
import Welcome from './Components/Welcome';
import TeacherDashboard from './Components/Teacher/TeacherDashboard'
import GeneratedQuiz from './Components/Teacher/GeneratedQuiz';
import ResultsTeacher from './Components/Teacher/ResultsTeacher';
import About from './Components/AboutTeacher';
import AboutStudent from './AboutStudent';
import QuizesGiven from './Components/Student/QuizesGiven';
import Faq from './Faq';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/signup/:userType" element={<Signup/>}></Route>
    <Route exact path="/login/:userType" element={<Login/>}></Route>
    <Route exact path="/studentDashboard" element={<StudentDashboard/>}></Route>
    <Route exact path="/" element={<Welcome/>}></Route>
    <Route exact path="/teacherDashboard" element={<TeacherDashboard/>}></Route>
    <Route exact path="/generatedQuizforTeacher" element={<GeneratedQuiz/>}></Route>
    <Route exact path="/resultForTeacher" element={<ResultsTeacher/>}></Route>
    <Route exact path="/aboutTeacher" element={<About/>}></Route>
    <Route exact path="/aboutStudent" element={<AboutStudent/>}></Route>
    <Route exact path="/quizesGiven" element={<QuizesGiven/>}></Route>
    <Route exact path="/faq/:userType" element={<Faq/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
