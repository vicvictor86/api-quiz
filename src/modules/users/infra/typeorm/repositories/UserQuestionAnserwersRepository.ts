import ICreateUserQuestionAnswersDTO from "@modules/users/dtos/ICreateUserQuestionAnswersDTO";
import IUserQuestionAnswersRepository from "@modules/users/repositories/IUserQuestionAnswersRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import UserQuestionAnswers from "../entities/UserQuestionAnswers";

export default class UserQuestionAnswersRepository implements IUserQuestionAnswersRepository {
  private ormRepository: Repository<UserQuestionAnswers>;

  constructor() {
    this.ormRepository = getRepository(UserQuestionAnswers);
  }

  public async find(user_id: string, question_id: string): Promise<UserQuestionAnswers | undefined> {
    const answer = await this.ormRepository.findOne({
      where: {
        user_id,
        question_id,
      }
    });

    return answer;
  }

  public async create(answerData: ICreateUserQuestionAnswersDTO): Promise<UserQuestionAnswers> {
    const answer = this.ormRepository.create(answerData);

    await this.ormRepository.save(answer);

    return answer;
  }

  public async findAll(): Promise<UserQuestionAnswers[] | undefined> {
    const answer = await this.ormRepository.find();

    return answer;
  }

  public async findById(id: string): Promise<UserQuestionAnswers | undefined> {
    const answer = await this.ormRepository.findOne({
      where: {
        id,
      }
    });

    return answer;
  }

  public async save(answerData: UserQuestionAnswers): Promise<UserQuestionAnswers> {
    return await this.ormRepository.save(answerData);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
