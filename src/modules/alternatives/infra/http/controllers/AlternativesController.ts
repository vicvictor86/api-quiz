import CreateAlternativeService from "@modules/alternatives/services/CreateAlternativeService";
import FindAlternativeService from "@modules/alternatives/services/FindAlternativeService";
import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class AlternativesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { question_id, choice, correct_alternative } = request.body;

    const createAlternativeService = container.resolve(CreateAlternativeService);

    const alternative = await createAlternativeService.execute({question_id, choice, correct_alternative});

    return response.status(200).json(instanceToInstance(alternative));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const findAlternativeService = container.resolve(FindAlternativeService);

    const alternatives = await findAlternativeService.execute();

    return response.status(200).json(instanceToInstance(alternatives));
  }
}
