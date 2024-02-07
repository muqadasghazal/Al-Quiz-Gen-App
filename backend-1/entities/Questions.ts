import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,OneToMany } from 'typeorm';
import { Quiz } from './Quiz';
import { User } from './Teacher';

@Entity()
export class Questions{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(()=>Quiz, (quiz)=> quiz.questions , {eager:true})
    quiz!:Quiz;

    @Column({ type: 'varchar', length: 800 })
    questionText!: string;

    @Column()
    correctAnswer!: string;
}