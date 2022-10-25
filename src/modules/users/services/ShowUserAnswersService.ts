import { inject, injectable } from "tsyringe";
import UserQuestionAnswers from "../infra/typeorm/entities/UserQuestionAnswers";
import IUserQuestionAnswersRepository from "../repositories/IUserQuestionAnswersRepository";

@injectable()
export default class ShowUserAnswersService {
  constructor(
    @inject('UserQuestionAnswers')
    private userQuestionAnswersRepository: IUserQuestionAnswersRepository,
  ){}

  public async execute(): Promise<UserQuestionAnswers[]>{
    const answers = await this.userQuestionAnswersRepository.findAll();

    if(!answers){
      return [];
    }

    return answers;
  }
}
