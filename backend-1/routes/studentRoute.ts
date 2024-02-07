import {Router} from 'express'
import { Request , Response } from 'express'
import { body, validationResult } from "express-validator";
import {Student} from '../entities/Student'
// import { Student } from '../entities/Student';
import { getRepository} from 'typeorm';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import extractJWT from '../middleware/extractJWT';



const router = Router();
interface IUser{

    email: string,
   
  }
  
  const jwtSecret = 'allahisone'; 
  const signJWT=(user:IUser, callback:(error:Error | null , token:string| null)=>void):void =>{
      try {
        jwt.sign({email : user.email},jwtSecret,(error,token)=>{
          if(error){
            callback(error , null)
          }
          else if(token){
            callback(null,token)
          }
        }) 
      } catch (error) {
        callback(error,null)
      }
    }

router.post('/createStudent' ,
[
    // Validation using express-validator middleware
    body('userName').notEmpty().withMessage('User Name is required'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
async(req:Request , res:Response)=>{
    try {
        let studentRepo = await getRepository(Student)
    let {userName, email, password} = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Hashing passwords
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, salt);

    //check if same emails exists
    let a = await studentRepo.findOne({
        where:{
            email:req.body.email
        }
    })
    if(a){
      res.send("Please Login")
    }
    else{
      let newStudent = new Student()
      newStudent.email = email;
      newStudent.password = secPassword;
      newStudent.username = userName
      await studentRepo.save(newStudent)
      signJWT(newStudent,(error , token)=>{
          if(error){
            res.send("unable to generate token");
          }
          else if(token){
            res.status(201).json({token : token , message:"user created" , newStudent:newStudent});
          }
         })
    }
   
    } catch (error) {
        res.send(error)
    }
})

router.post('/login' ,[
  // Validation using express-validator middleware
  body('email').notEmpty().isEmail().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async(req:Request , res:Response)=>{
    try {
      let {email, password} = req.body;
      let studentRepo = await getRepository(Student)

      //do user exist?
      let user = await studentRepo.findOne({
        where:{
          email: req.body.email
        }
      })
      if(user){
        let isPasswordMatch = await bcrypt.compare(password , user.password )
        if(isPasswordMatch){
          signJWT(user,(error , token)=>{
            if(error){
              res.send("unable to generate token");
            }
            else if(token){
              res.status(201).json({token : token});
            }
           })
        }
        else{
          res.status(400).send("Enter right password")
        }

      }
      else{
        res.status(400).send("Please Register First!")
      }
    } catch (error) {
      res.status(400).send(error)
    }
})

//login required
router.get("/getUser" ,extractJWT ,async(req:Request , res:Response)=>{
  let user = res.locals.user;
  let studentRepo = getRepository(Student);
  let studentFound = await studentRepo.findOne({
    where:{
      email: user.email
    }
  })
  res.status(201).send({studentFound})
})

//login required 
router.delete('/deleteUser' , extractJWT , async(req:Request , res:Response)=>{
  try {
    let user = res.locals.user;
    let studentRepo = getRepository(Student);
    let studentFound = await studentRepo.findOne({
      where:{
        email: user.email
      }
    })
    if(studentFound){
      await studentRepo.delete(studentFound.id)
      res.status(201).send("Student deleted")
    }
    else{
      res.send("usr not found")
    }
   
    
  } catch (error) {
    res.status(401).send(error)
  }
 
} )
export default router;