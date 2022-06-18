import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import ICreateAlternativeDto from "../dtos/ICreateAlternativeDTO";
import Alternative from "../infra/typeorm/entities/Alternative";
import IAlternativesRepository from "../repositories/IAlternativesRepository";

@injectable()
export default class FindAlternativeService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,
  ){}

  public async execute(): Promise<Alternative[]> {
    const alternatives = await this.alternativesRepository.findAll();

    if(!alternatives) {
      return [];
    }

    return alternatives;
  }
}
