import { getRepository, Repository } from "typeorm";
import Alternative from "../entities/Alternative";
import IAlternativesRepository from "@modules/alternatives/repositories/IAlternativesRepository"
import ICreateAlternativeDTO from "@modules/alternatives/dtos/ICreateAlternativeDTO";
import IUpdateAlternativeDTO from "@modules/alternatives/dtos/IUpdateAlternativeDTO";
import IFindAlternativeWithQuestionIdDTO from "@modules/alternatives/dtos/IFindAlternativeWithQuestionIdDTO";
import UserQuestionAnswers from "@modules/users/infra/typeorm/entities/UserQuestionAnswers";

export default class AlternativeRepository implements IAlternativesRepository {
  private ormRepository: Repository<Alternative>;
  private userQuestionsAnswers: Repository<UserQuestionAnswers>;

  constructor() {
    this.ormRepository = getRepository(Alternative);
    this.userQuestionsAnswers = getRepository(UserQuestionAnswers);
  }

  public async find({ question_id, choice }: IFindAlternativeWithQuestionIdDTO): Promise<Alternative | undefined> {
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
    const alternative = this.ormRepository.create(
      {
        question_id: alternativeData.question.id,
        choice: alternativeData.choice,
        correct_alternative: alternativeData.correct_alternative,
      }

    );

    await this.ormRepository.save(alternative);

    const alternativeWithEagerLoaded = await this.ormRepository.findOneOrFail({
      where: {
        id: alternative.id,
      }
    });

    //Tirar dps
    // const user_questions_answers = this.userQuestionsAnswers.create({
    //   user_id: alternativeData.question.created_by.id,
    //   question_id: alternativeData.question.id,
    //   alternative_id: alternativeWithEagerLoaded.id,
    //   is_right: alternativeData.correct_alternative,
    // });

    // await this.userQuestionsAnswers.save(user_questions_answers);

    return alternativeWithEagerLoaded;
  }

  public async update(alternativeData: IUpdateAlternativeDTO): Promise<Alternative> {
    const alternativeToUpdate = await this.ormRepository.findOne({
      where: {
        id: alternativeData.alternative_id,
      }
    });

    const updatedAlternative = {
      ...alternativeToUpdate,
      ...(alternativeData.choice && { choice: alternativeData.choice }),
      ...(alternativeData.correct_alternative && { correct_alternative: alternativeData.correct_alternative }),
    } as Alternative;

    await this.ormRepository.save(updatedAlternative)

    return updatedAlternative;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(data: Alternative): Promise<Alternative> {
    return await this.ormRepository.save(data);
  }
}
