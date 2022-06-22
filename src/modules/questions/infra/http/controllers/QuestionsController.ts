import CreateQuestionService from "@modules/questions/services/CreateQuestionService";
import DeleteQuestionService from "@modules/questions/services/DeleteQuestionService";
import IndexQuestionService from "@modules/questions/services/IndexQuestionService";
import ShowQuestionService from "@modules/questions/services/ShowQuestionService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response>{
    const { enunciate, is_active } = request.body;
    const userId = request.user.id;

    const createQuestionService = container.resolve(CreateQuestionService);

    const question = await createQuestionService.execute({ userId, enunciate, is_active });

    return response.status(200).json(question);
  }

  public async show(request: Request, response: Response): Promise<Response>{
    const showQuestionService = container.resolve(ShowQuestionService);

    const question = await showQuestionService.execute();

    return response.status(200).json(question);
  }

  public async index(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const indexQuestionService = container.resolve(IndexQuestionService);

    const question = await indexQuestionService.execute(id);

    return response.status(200).json(question);
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const userId = request.user.id;

    const deleteQuestionService = container.resolve(DeleteQuestionService);

    await deleteQuestionService.execute({ id, userId });

    return response.status(200).json();
  }
}
