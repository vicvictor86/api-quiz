import User from '@modules/users/infra/typeorm/entities/User';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('questions')
class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, {eager: true})
  @JoinColumn({ name : 'user_id' })
  created_by: User;

  @Column()
  enunciate: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
};

export default Question;
