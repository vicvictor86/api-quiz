import { inject, injectable } from "tsyringe";
import ICreateQuestionDTO from "../dtos/ICreateQuestionDTO";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

@injectable()
export default class CreateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ){}

  public async execute({userId, enunciate, is_active}: ICreateQuestionDTO){
    const question = await this.questionsRepository.create(
      {
        userId,
        enunciate,
        is_active,
      }
    );

    return question;
  }
}
