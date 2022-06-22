import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import ICreateAlternativeDto from "../dtos/ICreateAlternativeDTO";
import Alternative from "../infra/typeorm/entities/Alternative";
import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import IAlternativesRepository from "../repositories/IAlternativesRepository";

interface Request extends ICreateAlternativeDto {
  user_id: string;
}

@injectable()
export default class CreateAlternativeService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,

    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ){}

  public async execute({question_id, choice, correct_alternative, user_id }: Request): Promise<Alternative> {
    const alternativeExists = await this.alternativesRepository.find({ question_id, choice });
    const question = await this.questionsRepository.findById(question_id);

    if(alternativeExists){
      throw new AppError('Alternative already exists');
    }

    if(!question){
      throw new AppError('Question not found');
    }

    if(question.created_by.id !== user_id){
      throw new AppError('User must be the creator of question to add alternative');
    }

    const alternative = await this.alternativesRepository.create({ question_id, correct_alternative, choice });

    if(!alternative){
      throw new AppError('Alternative already exists');
    }

    return alternative;
  }
}
