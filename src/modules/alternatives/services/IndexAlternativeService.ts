import { inject, injectable } from "tsyringe";
import IAlternativesRepository from "@modules/alternatives/repositories/IAlternativesRepository";
import Alternative from "../infra/typeorm/entities/Alternative";
import AppError from "@shared/errors/AppError";

@injectable()
export default class IndexAlternativeService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,
  ){}

  public async execute(id: string): Promise<Alternative> {
    const alternative = await this.alternativesRepository.findById(id);

    if(!alternative){
      throw new AppError('Alternative with this is not found');
    }

    return alternative;
  }
}
