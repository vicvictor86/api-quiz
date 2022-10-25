import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import IAlternativesRepository from "@modules/alternatives/repositories/IAlternativesRepository";
import UserQuestionAnswers from "../infra/typeorm/entities/UserQuestionAnswers";
import IUserQuestionAnswersRepository from "../repositories/IUserQuestionAnswersRepository";

interface Request {
  user_id: string;

  question_id: string;

  alternative_id: string;

}

@injectable()
export default class CreateUserAnswersService {
  constructor(
    @inject('UserQuestionAnswers')
    private userQuestionAnswersRepository: IUserQuestionAnswersRepository,

    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,
  ) {}

  public async execute({ user_id, question_id, alternative_id }: Request): Promise<UserQuestionAnswers> {

    const alternative = await this.alternativesRepository.findById(alternative_id);

    if(!alternative) {
      throw new AppError('Alternative not found');
    }

    const alternativeQuestionId = alternative.belongs_to.id;

    if(alternativeQuestionId !== question_id) {
      throw new AppError('Alternative do not belong to this question or question not found');
    }

    const is_right = alternative.correct_alternative;

    const alreadyAnswer = await this.userQuestionAnswersRepository.find(user_id, question_id);

    if (alreadyAnswer) {
      throw new AppError('User already answer this question');
    }

    const answer = await this.userQuestionAnswersRepository.create({
      user_id,
      question_id,
      alternative_id,
      is_right,
    });

    return answer;
  }
}
