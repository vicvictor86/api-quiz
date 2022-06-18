import { inject, injectable } from "tsyringe";
import Question from "../infra/typeorm/entities/Questions";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

@injectable()
export default class ShowQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ){}

  public async execute(): Promise<Question[]> {
    const questions = await this.questionsRepository.findAll();

    if(!questions){
      return [];
    }

    return questions;
  }
}
