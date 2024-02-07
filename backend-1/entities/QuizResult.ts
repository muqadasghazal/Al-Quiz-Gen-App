import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,OneToMany,UpdateDateColumn } from 'typeorm';
import { Student } from './Student';
import { Quiz } from './Quiz';

@Entity()
export class QuizResult{
    //20 marks is students k is quiz main aye hain isi liy quizes k sath one to many ka realtion h
    @PrimaryGeneratedColumn()
    id!:number

    @ManyToOne(()=>Student, (student) => student.result)
    studentId!: Student;

    @Column()
    score!:number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date
  
    @UpdateDateColumn()
    updatedAt! : Date

    @ManyToOne(()=>Quiz , (quiz) => quiz.result)
    quizId!: Quiz;


}