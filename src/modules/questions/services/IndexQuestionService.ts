import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Question from "../infra/typeorm/entities/Questions";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

@injectable()
export default class IndexQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ){}

  public async execute(id: string) : Promise<Question>{
    const question = await this.questionsRepository.findById(id);


    if(!question){
      throw new AppError('Question not found');
    }

    console.log(question.created_by);
    return question;
  }
}
