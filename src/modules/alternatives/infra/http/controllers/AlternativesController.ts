import CreateAlternativeService from "@modules/alternatives/services/CreateAlternativeService";
import IndexAlternativeService from "@modules/alternatives/services/IndexAlternativeService";
import ShowAlternativeService from "@modules/alternatives/services/ShowAlternativeService";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AlternativesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { question_id, choice, correct_alternative } = request.body;
    const user_id = request.user.id;

    const createAlternativeService = container.resolve(CreateAlternativeService);

    const alternative = await createAlternativeService.execute({question_id, choice, correct_alternative, user_id});

    return response.status(200).json(instanceToInstance(alternative));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showAlternativeService = container.resolve(ShowAlternativeService);

    const alternatives = await showAlternativeService.execute();

    return response.status(200).json(instanceToInstance(alternatives));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const indexAlternativeService = container.resolve(IndexAlternativeService);

    const alternative = await indexAlternativeService.execute(id);

    return response.status(200).json(instanceToInstance(alternative));
  }
}
