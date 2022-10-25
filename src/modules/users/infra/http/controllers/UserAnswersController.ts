import CreateUserAnswersService from '@modules/users/services/CreateUserAnswersService';
import ShowUserAnswersService from '@modules/users/services/ShowUserAnswersService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { question_id, alternative_id } = request.body;
    const user_id = request.user.id;

    const userCreateService = container.resolve(CreateUserAnswersService);

    const answer = await userCreateService.execute({
      user_id,
      question_id,
      alternative_id
    });

    return response.json(instanceToInstance(answer));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showUsersService = container.resolve(ShowUserAnswersService);

    const users = await showUsersService.execute();

    return response.json(instanceToInstance(users));
  }

  // public async index(request: Request, response: Response): Promise<Response> {
  //   const id = request.params.id;

  //   const indexUserService = container.resolve(IndexUserService);

  //   const user = await indexUserService.execute(id);

  //   return response.json(instanceToInstance(user));
  // }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const id = request.params.id;
  //   const { name, email, password } = request.body;

  //   const updateUserService = container.resolve(UpdateUserService);

  //   const user = await updateUserService.execute({name, email, password, id});

  //   return response.json(instanceToInstance(user));
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const id = request.params.id;

  //   const deleteUserService = container.resolve(DeleteUserService)

  //   await deleteUserService.execute(id);

  //   return response.status(200).json();
  // }
}
