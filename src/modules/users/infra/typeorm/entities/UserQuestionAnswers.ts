import Alternative from '@modules/alternatives/infra/typeorm/entities/Alternative';
import Question from '@modules/questions/infra/typeorm/entities/Questions';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('user_questions_answers')
class UserQuestionAnswers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  question_id: string;

  @Column()
  alternative_id: string;

  @ManyToOne(() => User, (user) => user.user_questions_answers, {eager: true})
  @JoinColumn({name:'user_id'})
  user: User;

  @ManyToOne(() => Question, (question) => question.user_questions_answers, {eager: true})
  @JoinColumn({name:'question_id'})
  question: Question;

  @ManyToOne(() => Alternative, (alternative) => alternative.user_questions_answers, {eager: true})
  @JoinColumn({name:'alternative_id'})
  alternative: Alternative;

  @Column()
  is_right: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
};

export default UserQuestionAnswers;
