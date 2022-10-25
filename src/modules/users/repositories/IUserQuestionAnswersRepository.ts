import ICreateUserQuestionAnswersDTO from "../dtos/ICreateUserQuestionAnswersDTO";
import UserQuestionAnswers from "../infra/typeorm/entities/UserQuestionAnswers";

export default interface IUserQuestionAnswersRepository {
  find(user_id: string, question_id: string): Promise<UserQuestionAnswers | undefined>;
  findAll(): Promise<UserQuestionAnswers[] | undefined>;
  findById(id: string): Promise<UserQuestionAnswers | undefined>;
  create(userQuesUserQuestionAnswers: ICreateUserQuestionAnswersDTO): Promise<UserQuestionAnswers>;
  delete(id: string): Promise<void>;
  save(userQuesUserQuestionAnswers: UserQuestionAnswers): Promise<UserQuestionAnswers>;
}
