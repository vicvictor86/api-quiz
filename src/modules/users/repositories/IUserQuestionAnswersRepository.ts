import ICreateUserQuestionAnswersDTO from "../dtos/ICreateUserQuestionAnswersDTO";
import UserQuestionAnswers from "../infra/typeorm/entities/UserQuestionAnswers";

export default interface IUserQuestionAnswersRepository {
  create(userQuesUserQuestionAnswers: ICreateUserQuestionAnswersDTO): Promise<UserQuestionAnswers>;
  find(user_id: string, question_id: string): Promise<UserQuestionAnswers | undefined>;
  findByUserId(user_id: string): Promise<UserQuestionAnswers[] | undefined>;
  findByQuestionId(question_id: string): Promise<UserQuestionAnswers[] | undefined>;
  findByAlternativeId(alternative_id: string): Promise<UserQuestionAnswers[] | undefined>;
  findById(id: string): Promise<UserQuestionAnswers | undefined>;
  findAll(): Promise<UserQuestionAnswers[] | undefined>;
  delete(id: string): Promise<void>;
  save(userQuesUserQuestionAnswers: UserQuestionAnswers): Promise<UserQuestionAnswers>;
}
