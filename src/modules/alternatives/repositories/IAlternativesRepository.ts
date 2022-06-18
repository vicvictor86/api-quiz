import ICreateAlternativeDto from "../dtos/ICreateAlternativeDTO";
import IFindAlternativeDto from "../dtos/IFindAlternativeDTO";
import Alternative from "../infra/typeorm/entities/Alternative";

export default interface IQuestionsRepository {
  findAll(): Promise<Alternative[] | undefined>;
  findById(id: string): Promise<Alternative | undefined>;
  find(alternativeData: IFindAlternativeDto): Promise<Alternative | undefined>;
  create(alternativeData: ICreateAlternativeDto): Promise<Alternative>;
  delete(id: string): Promise<void>;
  save(alternative: Alternative): Promise<Alternative>;
}
