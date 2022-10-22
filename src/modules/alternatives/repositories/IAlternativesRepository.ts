import ICreateAlternativeDTO from "../dtos/ICreateAlternativeDTO";
import IFindAlternativeWithQuestionIdDTO from "../dtos/IFindAlternativeWithQuestionIDDTO";
import IUpdateAlternativeDTO from "../dtos/IUpdateAlternativeDTO";
import Alternative from "../infra/typeorm/entities/Alternative";

export default interface IAlternativesRepository {
  findAll(): Promise<Alternative[] | undefined>;
  findById(id: string): Promise<Alternative | undefined>;
  find(alternativeData: IFindAlternativeWithQuestionIdDTO): Promise<Alternative | undefined>;
  create(alternativeData: ICreateAlternativeDTO): Promise<Alternative>;
  update(alternativeData: IUpdateAlternativeDTO): Promise<Alternative>;
  delete(id: string): Promise<void>;
  save(alternative: Alternative): Promise<Alternative>;
}
