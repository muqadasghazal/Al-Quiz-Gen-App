import {Entity ,PrimaryGeneratedColumn , Column , OneToMany , JoinTable } from 'typeorm'
import {Quiz} from './Quiz'
import { Questions } from './Questions'
import { QuizResult } from './QuizResult'


@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id! : number

    @Column()
    username! : string

    @Column()
    password! : string

    @Column()
    email! : string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt! : Date
    
    @OneToMany(()=>QuizResult , (quizResult)=>quizResult.studentId, { eager:true,onDelete:'CASCADE' , onUpdate:'CASCADE'})
    result!: QuizResult[]
}