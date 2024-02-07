import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,OneToMany,UpdateDateColumn } from 'typeorm';
import { User } from './Teacher';
import { Questions } from './Questions';
import { QuizResult } from './QuizResult';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  // Storing code in the 'code' column with the VARCHAR datatype and length limit
  @Column({ type: 'varchar', length: 4000 })
  code!: string;

  @Column()
  numberOfQuestions! : number;

  @ManyToOne(() => User, (user) => user.quizzes, {eager:true})
  teacher!: User;

  @Column()
  questionType!:string

  @OneToMany(() => Questions, (question) => question.quiz , { onDelete:'CASCADE' , onUpdate:'CASCADE'})
  questions!: Questions[];

  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt! : Date

  @OneToMany(()=>QuizResult , (QuizResult)=>QuizResult.quizId , { eager:true ,onDelete:'CASCADE' , onUpdate:'CASCADE'} )
  result!:QuizResult[]

}
