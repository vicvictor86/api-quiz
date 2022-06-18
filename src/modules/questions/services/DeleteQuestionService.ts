import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

@injectable()
export default class DeleteQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ){}

  public async execute(id: string): Promise<void>{
    const question = await this.questionsRepository.findById(id);

    if(!question){
      throw new AppError('Question not found');
    }

    await this.questionsRepository.delete(id);
  }
}
