import {Router} from 'express'
import { Request , Response } from 'express'
import { Questions } from '../entities/Questions';
import extractJWT from '../middleware/extractJWT';
import { getRepository} from 'typeorm';
import { QuizResult } from '../entities/QuizResult';
import { Student } from '../entities/Student';
import { User } from '../entities/Teacher';
import { Quiz } from '../entities/Quiz';
import { In } from 'typeorm';
import { Result } from 'express-validator';



const router = Router();


//auth token of student required


//get Scores , for student's Given Quizes option
//students auth token, quizid : req
//res: quizName,teacher anme, scores, no. of questions , type of questions, conducted at
router.get('/givenQuizesForStudents', extractJWT, async (req: Request, res: Response) => {
    try{
        let user = res.locals.user;
        let studentRepo = getRepository(Student);
        let student = await studentRepo.findOne({
            where: {
                email: user.email
            }
        });
         // Get quiz IDs from result table
         let quizResultRepo = getRepository(QuizResult);
         let quizzesStudentGiven = await quizResultRepo.find({
             where: {
                 studentId :{id:student.id}
             },
             relations:{
                 quizId:true
             }
         });
         const transformedData = quizzesStudentGiven.map(result => ({
            quizName: result.quizId.name,
            conductedAt: result.quizId.createdAt,
            teacherName: result.quizId.teacher.username,
            questionType: result.quizId.questionType,
            numberOfQuestions: result.quizId.numberOfQuestions,
            score: result.score,
        }));
    
        res.status(200).json({transformedData});
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//teacher will get all students result that engaged in his quiz
//in teacher side, in Get students result
//from teacher id, get quiz ids he created then search in quiz result table and get all students result that match that ids
router.get('/getStudentsResult',extractJWT , async(req:Request , res:Response)=>{
    //get teacher
    let user = res.locals.user;
        let teacherRepo = getRepository(User);
        let teacher = await teacherRepo.findOne({
            where: {
                email: user.email
            }
        });

    //get quiz ids of all quizes he made from quiz table
    let quizRepo = getRepository(Quiz)
    let quizTeacherTaken = await quizRepo.find({
        where: {
            teacher:{id:teacher.id}
        }
    });
    const extractedQuizIds = quizTeacherTaken.map(quiz => quiz.id);
    //now extract students from these quiz ids.
    let resultRepo = getRepository(QuizResult);
    let students = await resultRepo.find({
        where:{
            quizId:In(extractedQuizIds)
        },
        relations:{
            studentId:true
        }
    })
    const extractStudentIds = students.map(student => student.studentId.id);
    //get students names
    let data = [];
    let studentRepo = getRepository(Student)
    let finalStudents = await studentRepo.find({
        where:{
            id:In(extractStudentIds)
        }
    })
    for(let i=0; i<extractStudentIds.length; i++){
        let studentName = (await studentRepo.findOne({where:{id:extractStudentIds[i]}})).username
        let score = students[i].score;
        let quizDate = quizTeacherTaken[i].createdAt;
        let quizType = quizTeacherTaken[i].questionType;
        let quizName = quizTeacherTaken[i].name
        console.log("quizTeacherTaken:", quizTeacherTaken);
        data.push({studentName,score,quizDate,quizType,quizName})
    }

    res.status(200).json({data})
})






export default router;