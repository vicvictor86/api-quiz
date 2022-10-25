import IndexStatisticsService from '@modules/users/services/IndexStatisticsService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class StatisticsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { question_id, alternative_id } = request.body;
    const user_id = request.user.id;

    const indexUserService = container.resolve(IndexStatisticsService);

    const user = await indexUserService.execute({
      user_id,
      question_id,
      alternative_id,
    });

    return response.json(instanceToInstance(user));
  }
}
