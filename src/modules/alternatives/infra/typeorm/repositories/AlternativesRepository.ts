import { getRepository, Repository } from "typeorm";
import Alternative from "../entities/Alternative";
import IAlternativesRepository from "@modules/alternatives/repositories/IAlternativesRepository"
import ICreateAlternativeDTO from "@modules/alternatives/dtos/ICreateAlternativeDTO";
import IFindAlternativeDto from "@modules/alternatives/dtos/IFindAlternativeDTO";

export default class AlternativeRepository implements IAlternativesRepository {
  private ormRepository: Repository<Alternative>;

  constructor(){
    this.ormRepository = getRepository(Alternative);
  }

  public async find({ question_id, choice }: IFindAlternativeDto): Promise<Alternative | undefined> {
    const alternative = await this.ormRepository.findOne({
      where: {
        question_id,
        choice,
      }
    });

    return alternative;
  }

  public async findAll(): Promise<Alternative[] | undefined> {
    const alternatives = await this.ormRepository.find();

    return alternatives;
  }

  public async findById(id: string): Promise<Alternative | undefined> {
    const alternative = await this.ormRepository.findOne({
      where: {
        id,
      }
    });

    return alternative;
  }

  public async create(alternativeData: ICreateAlternativeDTO): Promise<Alternative> {
    const alternative = this.ormRepository.create(alternativeData);

    await this.ormRepository.save(alternative);

    const alternativeWithEagerLoaded = await this.ormRepository.findOneOrFail({
      where: {
        id: alternative.id,
      }
    });

    return alternativeWithEagerLoaded;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(data: Alternative): Promise<Alternative> {
    return await this.ormRepository.save(data);
  }
}
