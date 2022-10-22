import Question from "@modules/questions/infra/typeorm/entities/Questions";

export default interface ICreateAlternativeDTO {
  question: Question;

  choice: string;

  correct_alternative: boolean;
}
