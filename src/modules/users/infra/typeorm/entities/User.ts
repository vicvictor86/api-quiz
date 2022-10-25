import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import UserQuestionAnswers from './UserQuestionAnswers';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({type: 'varchar', nullable: true})
  @Exclude()
  avatar: string | undefined;

  @OneToMany(() => UserQuestionAnswers, user_questions_answers => user_questions_answers.user)
  user_questions_answers: UserQuestionAnswers[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose( { name: 'avatar_url' } )
  getavatar_url(): String | null {
    if(!this.avatar){
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }
};

export default User;
