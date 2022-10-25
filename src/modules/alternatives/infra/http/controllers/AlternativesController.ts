import CreateAlternativeService from "@modules/alternatives/services/CreateAlternativeService";
import UpdateAlternativeService from "@modules/alternatives/services/UpdateAlternativeService";
import DeleteAlternativeService from "@modules/alternatives/services/DeleteAlternativeService";
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

  public async update(request: Request, response: Response): Promise<Response> {
    const { alternative_id, choice, correct_alternative } = request.body;
    const user_id = request.user.id;

    const updateAlternativeService = container.resolve(UpdateAlternativeService);
    const updatedAlternative = await updateAlternativeService.execute({alternative_id, choice, correct_alternative, user_id});

    return response.status(200).json(instanceToInstance(updatedAlternative));
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const alternativeId = request.params.id;
    const userId = request.user.id;

    const deleteAlternativeService = container.resolve(DeleteAlternativeService);

    await deleteAlternativeService.execute({alternativeId, userId});

    return response.status(200).json();
  }
}
