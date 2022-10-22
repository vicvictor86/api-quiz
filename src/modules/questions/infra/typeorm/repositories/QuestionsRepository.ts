import ICreateQuestionDTO from "@modules/questions/dtos/ICreateQuestionDTO";
import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import { getRepository, Repository } from "typeorm";
import Question from "../entities/Questions";

export default class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Repository<Question>;

  constructor(){
    this.ormRepository = getRepository(Question);
  }

  public async findAll(): Promise<Question[] | undefined> {
    const questions = await this.ormRepository.find();

    return questions;
  }

  public async findById(id: string): Promise<Question | undefined> {
    const questions = await this.ormRepository.findOne({
      where: {
        id,
      }
    });

    return questions;
  }

  public async create(questionData: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create(questionData);

    await this.ormRepository.save(question);

    return question;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
  public async save(data: Question): Promise<Question> {
    return await this.ormRepository.save(data);
  }

}
