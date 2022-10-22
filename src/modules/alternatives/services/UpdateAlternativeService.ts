import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Alternative from "../infra/typeorm/entities/Alternative";
import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import IAlternativesRepository from "../repositories/IAlternativesRepository";

interface Request {
  user_id: string;
  alternative_id: string;
  choice: string;
  correct_alternative: boolean;
}

@injectable()
export default class UpdateAlternativeService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,

    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ){}

  public async execute({alternative_id, choice, correct_alternative, user_id }: Request): Promise<Alternative> {
    const alternative = await this.alternativesRepository.findById(alternative_id);

    if(!alternative){
      throw new AppError('Alternative not found');
    }

    const question = await this.questionsRepository.findById(alternative.question_id);

    if(!question){
      throw new AppError('Question not found');
    }

    if(question.created_by.id !== user_id){
      throw new AppError('User must be the creator of question to add alternative');
    }

    const updatedAlternative = await this.alternativesRepository.update({ alternative_id, correct_alternative, choice });

    return updatedAlternative;
  }
}
