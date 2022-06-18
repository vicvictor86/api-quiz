import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import ICreateAlternativeDto from "../dtos/ICreateAlternativeDTO";
import Alternative from "../infra/typeorm/entities/Alternative";
import IAlternativesRepository from "../repositories/IAlternativesRepository";

@injectable()
export default class CreateAlternativeService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,
  ){}

  public async execute({question_id, choice, correct_alternative}: ICreateAlternativeDto): Promise<Alternative> {
    const alternativeExists = await this.alternativesRepository.find({ question_id, choice });

    if(alternativeExists){
      throw new AppError('Alternative already exists');
    }

    const alternative = await this.alternativesRepository.create({ question_id, correct_alternative, choice });

    const alternativeWithEagerLoaded = await this.alternativesRepository.findById(alternative.id);

    if(!alternativeWithEagerLoaded){
      throw new AppError('Alternative already exists');
    }

    return alternativeWithEagerLoaded;
  }
}
