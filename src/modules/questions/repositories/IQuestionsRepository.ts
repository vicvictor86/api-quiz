import ICreateQuestionDTO from "../dtos/ICreateQuestionDTO";
import Question from "../infra/typeorm/entities/Questions";

export default interface IQuestionsRepository {
  findAll(): Promise<Question[] | undefined>;
  findById(id: string): Promise<Question | undefined>;
  create(questionData: ICreateQuestionDTO): Promise<Question>;
  delete(id: string): Promise<void>;
  save(question: Question): Promise<Question>;
}
