import ICreateAlternativeDTO from "../dtos/ICreateAlternativeDTO";
import IFindAlternativeDTO from "../dtos/IFindAlternativeDTO";
import Alternative from "../infra/typeorm/entities/Alternative";

export default interface IQuestionsRepository {
  findAll(): Promise<Alternative[] | undefined>;
  findById(id: string): Promise<Alternative | undefined>;
  find(alternativeData: IFindAlternativeDTO): Promise<Alternative | undefined>;
  create(alternativeData: ICreateAlternativeDTO): Promise<Alternative>;
  delete(id: string): Promise<void>;
  save(alternative: Alternative): Promise<Alternative>;
}
