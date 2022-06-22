import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IQuestionsRepository from "../repositories/IQuestionsRepository";

interface Request {
  id: string,

  userId: string
}

@injectable()
export default class DeleteQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ){}

  public async execute({id, userId}: Request): Promise<void>{
    const question = await this.questionsRepository.findById(id);

    if(!question){
      throw new AppError('Question not found');
    }

    if(question.created_by.id !== userId) {
      throw new AppError('User must be the creator of question to removed');
    }

    await this.questionsRepository.delete(id);
  }
}
