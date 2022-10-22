import Question from '@modules/questions/infra/typeorm/entities/Questions';
import UserQuestionAnswers from '@modules/users/infra/typeorm/entities/UserQuestionAnswers';
import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('alternatives')
class Alternative {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question_id: string;

  @Exclude()
  @ManyToOne(() => Question, { eager: true })
  @JoinColumn({ name : 'question_id' })
  belongs_to: Question;

  @Column()
  choice: string;

  @Column()
  correct_alternative: boolean;

  @OneToMany(() => UserQuestionAnswers, user_questions_answers => user_questions_answers.alternative, {cascade: true})
  user_questions_answers: UserQuestionAnswers[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose( { name: 'question_name' } )
    getquestion_name(): String | null {
        if(!this.belongs_to.enunciate){
            return null;
        }

        return this.belongs_to.enunciate;
    }

  @Expose( { name: 'creator_name' } )
  getcreator_name(): String | null {
      if(!this.belongs_to.created_by.name){
          return null;
      }

      return this.belongs_to.created_by.name;
  }
};

export default Alternative;
