import { inject, injectable } from "tsyringe";
import UserQuestionAnswers from "../infra/typeorm/entities/UserQuestionAnswers";
import IUserQuestionAnswersRepository from "../repositories/IUserQuestionAnswersRepository";

interface Request {
  user_id: string;

  question_id: string;

  alternative_id: string;
}

@injectable()
export default class ShowUserAnswersService {
  constructor(
    @inject('UserQuestionAnswers')
    private userQuestionAnswersRepository: IUserQuestionAnswersRepository,
  ){}

  public async execute({ user_id, question_id, alternative_id }: Request): Promise<UserQuestionAnswers[] | undefined>{
    if (question_id) {
      return await this.userQuestionAnswersRepository.findByQuestionId(question_id);
    }

    if(alternative_id) {
      return await this.userQuestionAnswersRepository.findByAlternativeId(alternative_id);
    }

    if (user_id) {
      return await this.userQuestionAnswersRepository.findByUserId(user_id);
    }

    return [];
  }
}
