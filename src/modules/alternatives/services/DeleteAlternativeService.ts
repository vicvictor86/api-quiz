import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IAlternativesRepository from "../repositories/IAlternativesRepository";

interface Request {
  alternativeId: string;

  userId: string;
}

@injectable()
export default class DeleteAlternativeService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,
  ){}

  public async execute({ alternativeId, userId }: Request): Promise<void>{
    const alternative = await this.alternativesRepository.findById(alternativeId);

    if(!alternative){
      throw new AppError('Alternative not found');
    }

    const creatorAlternativeId = alternative.belongs_to.created_by.id;

    if(creatorAlternativeId !== userId) {
      throw new AppError('User most be the creator of the alternative');
    }

    await this.alternativesRepository.delete(alternativeId);
  }
}
