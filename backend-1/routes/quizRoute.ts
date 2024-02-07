import { Router } from 'express'
import { Request, Response } from 'express'
import { User } from '../entities/Teacher'
import extractJWT from '../middleware/extractJWT';
import { Repository, getRepository } from 'typeorm';
import { OpenAI } from "openai"; // Corrected import
import { Quiz } from '../entities/Quiz';
import { Questions } from '../entities/Questions';
import cheerio from 'cheerio';
import { In } from 'typeorm';
import { Student } from '../entities/Student';

import { QuizResult } from '../entities/QuizResult';




const router = Router();
const openai = new OpenAI({
  // enter your own OPENAI API- KEY 
  apiKey: "",
});
let generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

//teacher's auth token required, body details , quiz code sent as response
router.post('/createQuiz', extractJWT, async (req: Request, res: Response) => {
  const { prompt, typeofquestions, numberOfquestions } = req.body;
  let template2 = `<p>Question: Question's text</p>
    <ul>
      <li>true</li>
      <li>false</li>
    </ul>
    
    <p>Question: In which month of the Islamic calendar was Prophet Muhammad (peace be upon him) born?</p>
    <ul>
      <li>true</li>
      <li>false</li>
    </ul>
    
    <p>Question: Who was the wife of Prophet Muhammad (peace be upon him) who is known as the "Mother of the Believers"?</p>
    <ul>
    <li>true</li>
    <li>false</li>
    </ul>
    
    <p>Question: Which angel brought the revelations from Allah to Prophet Muhammad (peace be upon him)?</p>
    <ul>
    <li>true</li>
    <li>false</li>
    </ul>
    
    <p>Question: In which year did Prophet Muhammad (peace be upon him) migrate from Mecca to Medina?</p>
    <ul>
    <li>true</li>
    <li>false</li>
    </ul>
    
    <p>Correct Answers:</p>
    <ul>
      <li>True</li>
      <li>false</li>
      <li>true</li>
      <li>true</li>
      <li>true</li>
    </ul>`
  let template = `<p>Question: Which city is considered the birthplace of Prophet Muhammad (peace be upon him)?</p>
    <ul>
      <li>Mecca</li>
      <li>Medina</li>
      <li>Istanbul</li>
      <li>Cairo</li>
    </ul>
    
    <p>Question: In which month of the Islamic calendar was Prophet Muhammad (peace be upon him) born?</p>
    <ul>
      <li>Ramadan</li>
      <li>Dhu al-Hijjah</li>
      <li>Rabi al-Awwal</li>
      <li>Muharram</li>
    </ul>
    
    <p>Question: Who was the wife of Prophet Muhammad (peace be upon him) who is known as the "Mother of the Believers"?</p>
    <ul>
      <li>Khadijah</li>
      <li>Aisha</li>
      <li>Sawda</li>
      <li>Hafsa</li>
    </ul>
    
    <p>Question: Which angel brought the revelations from Allah to Prophet Muhammad (peace be upon him)?</p>
    <ul>
      <li>Angel Gabriel</li>
      <li>Angel Michael</li>
      <li>Angel Raphael</li>
      <li>Angel Azrael</li>
    </ul>
    
    <p>Question: In which year did Prophet Muhammad (peace be upon him) migrate from Mecca to Medina?</p>
    <ul>
      <li>620 CE</li>
      <li>622 CE</li>
      <li>632 CE</li>
      <li>636 CE</li>
    </ul>
    <p>Question: In which year did Prophet Muhammad (peace be upon him) migrate from Mecca to Medina?</p>
    <ul>
      <li>620 CE</li>
      <li>622 CE</li>
      <li>632 CE</li>
      <li>636 CE</li>
    </ul><p>Question: In which year did Prophet Muhammad (peace be upon him) migrate from Mecca to Medina?</p>
    <ul>
      <li>620 CE</li>
      <li>622 CE</li>
      <li>632 CE</li>
      <li>636 CE</li>
    </ul><p>Question: In which year did Prophet Muhammad (peace be upon him) migrate from Mecca to Medina?</p>
    <ul>
      <li>620 CE</li>
      <li>622 CE</li>
      <li>632 CE</li>
      <li>636 CE</li>
    </ul><p>Question: In which year did Prophet Muhammad (peace be upon him) migrate from Mecca to Medina?</p>
    <ul>
      <li>620 CE</li>
      <li>622 CE</li>
      <li>632 CE</li>
      <li>636 CE</li>
    </ul><p>Question: In which year did Prophet Muhammad (peace be upon him) migrate from Mecca to Medina?</p>
    <ul>
      <li>620 CE</li>
      <li>622 CE</li>
      <li>632 CE</li>
      <li>636 CE</li>
    </ul>
   

    <p>Correct Answers:</p>
    <ul>
      <li>Mecca</li>
      <li>Rabi al-Awwal</li>
      <li>Khadijah</li>
      <li>Angel Gabriel</li>
      <li>622 CE</li>
      <li>622 CE</li>
      <li>622 CE</li>
      <li>622 CE</li>
      <li>622 CE</li>
      <li>622 CE</li>

      
    </ul>`

  try {
    let user = res.locals.user;
    let teacherRepo = getRepository(User);
    let teacherFound = await teacherRepo.findOne({
      where: {
        email: user.email,
      },
    });
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Generate an HTML quiz code structured with unordered lists and list items (ul li).
            Code should be according to this template:  ${template}. The response should include ${numberOfquestions} questions code generated according to template.Don't go beyond the template i gave and each question should be of the ${typeofquestions} type.
            When generating the code for each question, ensure that it starts with ul , li tags and must follow the following structure 
            "Question: Who is known as the father of physics?" and while generating code for correct answers , 
            ensure that  it starts with following structure "<p>Correct Answers:</p> , must be unordered list
            . Additionally, please provide the correct answers for each question at the end of the quiz, separately from the questions themselves.
            Do not include any form attributes (e.g., form='something') or a submit button in the generated code. The code should not contain any HTML boilerplate and
            should consist solely of ul li elements. Avoid including text boxes in the generated code..
            `
        },
        {
          role: 'user',
          content: `Generate quiz code for ${prompt} topic`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    let finalRes = response.choices[0].message.content;
    const $ = cheerio.load(finalRes);
    let questions: string[] = [];
    let correctAnswers: string[] = [];

    const correctAnswersHeader = $('p:contains("Correct Answers:")');
    const question = $('p:contains("Question")');

    let quizRepo = getRepository(Quiz);
    let newQuiz = new Quiz();

    if (correctAnswersHeader.length > 0 && question.length > 0) {
      // Find the <ol> element following the correct answers header
      const correctAnswersList = correctAnswersHeader.next('ul');

      // Iterate through <li> elements within the <ol> to extract correct answers
      correctAnswers = correctAnswersList.find('li').map((index, element) => $(element).text()).get();

      //separate questions
      questions = question.map((index, element) => $(element).text()).get();
      //save quiz 1st
      newQuiz.teacher = teacherFound;
      newQuiz.name = generateRandomString(5);
      newQuiz.questionType = typeofquestions;
      newQuiz.numberOfQuestions = numberOfquestions;
      newQuiz.code = finalRes; // HTML response as text
      await quizRepo.insert(newQuiz);
      let questionRepo = getRepository(Questions);
      //save questions 
      for (let i = 0; i < questions.length; i++) {
        let newQuestion = new Questions();
        newQuestion.questionText = questions[i];
        newQuestion.correctAnswer = correctAnswers[i];
        newQuestion.quiz = newQuiz;
        await questionRepo.insert(newQuestion)
      }
    } else {
      console.log('Either questions/answer section is didnt came as expected by OPENAI.Please regerate.');
    }

    res.status(200).send({ finalRes, name: newQuiz.name });
  } catch (error) {
    res.status(401).send('Error on AI response generation: ' + error);
  }
});



router.post('/test', async (req: Request, res: Response) => {
  let html = `<p>Question: Who is considered the father of the Indian Constitution?</p>\n<ul>\n  <li>Mahatma Gandhi</li>\n  <li>Jawaharlal Nehru</li>\n  <li>B.R. Ambedkar</li>\n  <li>Sardar Vallabhbhai Patel</li>\n</ul>\n\n<p>Question: Which Indian emperor is known for establishing the Maurya Empire?</p>\n<ul>\n  <li>Ashoka</li>\n  <li>Chandragupta Maurya</li>\n  <li>Akbar</li>\n  <li>Harsha</li>\n</ul>\n\n<p>Question: What was the name of the nonviolent resistance movement led by Mahatma Gandhi against British rule in India?</p>\n<ul>\n  <li>Quit India Movement</li>\n  <li>Partition of India</li>\n  <li>Salt March</li>\n  <li>Civil Disobedience Movement</li>\n</ul>\n\n<p>Question: Who was the first Prime Minister of independent India?</p>\n<ul>\n  <li>Mahatma Gandhi</li>\n  <li>Jawaharlal Nehru</li>\n  <li>B.R. Ambedkar</li>\n  <li>Sardar Vallabhbhai Patel</li>\n</ul>\n\n<p>Correct Answers:</p>\n<ul>\n  <li>B.R. Ambedkar</li>\n  <li>Chandragupta Maurya</li>\n  <li>Civil Disobedience Movement</li>\n  <li>Jawaharlal Nehru</li>\n</ul>`
  const $ = cheerio.load(html);
  const question = $('p:contains("Question")');
  let questions: string[] = [];;
  let correctAnswers: string[] = [];;
  const correctAnswersHeader = $('p:contains("Correct Answers:")');
  if (correctAnswersHeader.length > 0) {
    // Find the <ol> element following the correct answers header
    const correctAnswersList = correctAnswersHeader.next('ul');

    // Iterate through <li> elements within the <ol> to extract correct answers
    correctAnswers = correctAnswersList.find('li').map((index, element) => $(element).text()).get();

    for (let i = 0; i < correctAnswers.length; i++) {
      console.log(correctAnswers[i])
    }
  } else {
    console.log('Correct answers section not found in the HTML.');
  }

  //question extraction


  if (question.length > 0) {
    // Iterate through <li> elements within the <ol> to extract correct answers
    questions = question.map((index, element) => $(element).text()).get();
    for (let i = 0; i < questions.length; i++) {
      console.log(questions[i] + i)
    }
  } else {
    console.log('Question text section not found in the HTML.');
  }
})

//get quiz for students
router.get('/studentGetquiz/:quizName', async (req: Request, res: Response) => {
  let quizName = req.params.quizName;
  let quizRepo = await getRepository(Quiz);
  let quizFound = await quizRepo.findOne({
    where: {
      name: quizName
    }
  })
  if (quizFound) {
    let quizCode = quizFound.code;
    //parse
    const $ = cheerio.load(quizCode);
    const correctAnswersHtml = $('p:contains("Correct Answers:")').next('ul').toString();

    // Remove the Correct Answers section from the main content
    $('p:contains("Correct Answers:")').next('ul').remove();

    // Retrieve the remaining HTML content
    const remainingHtmlContent = $.html();
    res.status(200).json({ questions: remainingHtmlContent, teacherName: quizFound.teacher.username, typeofquiz: quizFound.questionType, numberOfQuestions: quizFound.numberOfQuestions,quizId:quizFound.id })
  }
  else {
    res.status(400).send("please enter valid quiz name")
  }
})

//give auth token of teacher , for Generated quizes
router.get('/generatedQuiz', extractJWT, async (req: Request, res: Response) => {
  try {
    let quizRepo = await getRepository(Quiz);
    let user = res.locals.user;
    //find teacher 1st
    let teacherRepo = getRepository(User)
    let teacherFound = await teacherRepo.findOne({
      where: {
        email: user.email
      }
    })
    let teacherid = teacherFound.id;
    let quizFound = await quizRepo.find({
      where: {
        teacher: { id: teacherid }
      }
    })
    const extractedQuizIds = quizFound.map(quiz => quiz.id);
    if (extractedQuizIds) {
      const extractedQuizData = [];
      for (let i = 0; i < quizFound.length; i++) {
        const quizName = quizFound[i].name;
        const createdAt = quizFound[i].createdAt;
        const typeofquestions = quizFound[i].questionType;  
        const id = quizFound[i].id
        
        extractedQuizData.push({ quizName, createdAt, typeofquestions,id });
      }
      res.status(200).send({ extractedQuizData })

    }
    else {
      res.json({ message: 'No quizes generated' })
    }


  } catch (error) {
    res.send(error)
  }
})

//after quiz generation, teacher can also see quizes. by erendering quiz code
router.get('/getquizByCode/:id', async (req: Request, res: Response) => {
  try {
    let quizId = Number(req.params.id);
    let quizrepo = getRepository(Quiz)
    let quizFound = await quizrepo.findOne({
      where: {
        id: quizId
      }
    })
    if (quizFound) {
      res.status(201).json({code:quizFound.code})
    }
    else{
      res.status(401).send("No quiz found")
    }

  } catch (error) {
    res.send(error)
  }
})
//delete quiz for teacher , auth token required
router.delete('/deleteQuiz/:id', async (req: Request, res: Response) => {
  try {
    let quizid = Number(req.params.id)
    let quizRepo = await getRepository(Quiz);
    let quizFound = await quizRepo.findOne({
      where: {
        id: quizid
      }
    })
    if (quizFound) {
      await quizRepo.delete(quizFound.id)
      res.send("Quiz Deleted")
    }
  } catch (error) {
    res.send(error)
  }
})

// Calculate score of student
router.post('/calculateScore', extractJWT, async (req: Request, res: Response) => {
  try {
      let user = res.locals.user;
      let studentrepo = getRepository(Student)
      let userId = await studentrepo.findOne({
          where:{
              email : user.email
          }
      })
      
      const { ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, quizid } = req.body;

      // Get questions by quizid
      let questionRepo = getRepository(Questions);
      let questionsFound = await questionRepo.find({
          where: {
              quiz: { id: quizid }
          }
      });
      let scores = 0;
      for (let i = 0; i < questionsFound.length; i++) {
          const givenAnswer = req.body['ans' + (i + 1)].toLowerCase();
          const correctAnswer = questionsFound[i].correctAnswer.toLowerCase()
          if (givenAnswer === correctAnswer) {
              scores++;
          }
      }
      let wrong = questionsFound.length - scores;
      
      let quizResultrepo = await getRepository(QuizResult)
      let newResult = new QuizResult()
      newResult.studentId = userId;
      newResult.quizId = quizid;
      newResult.score = scores;
      await quizResultrepo.insert(newResult);

      res.status(200).json({ scores : scores , wrongAnswers: wrong}); // Sending scores as JSON object

  } catch (error) {
      res.status(400).json({ error: error.message }); // Sending error as JSON object
  }
});


export default router;