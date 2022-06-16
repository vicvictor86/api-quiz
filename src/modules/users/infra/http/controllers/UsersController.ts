import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import IndexUserService from '@modules/users/services/IndexUserService';
import ShowUsersService from '@modules/users/services/ShowUsersService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userCreateService = container.resolve(CreateUserService);

    const user = await userCreateService.execute({
      name,
      email,
      password
    });

    return response.json(instanceToInstance(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showUsersService = container.resolve(ShowUsersService);

    const users = await showUsersService.execute();

    return response.json(instanceToInstance(users));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const indexUserService = container.resolve(IndexUserService);

    const user = await indexUserService.execute(id);

    return response.json(instanceToInstance(user));
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const id = request.params.id;
  //   const { name, email, password } = request.body;

  //   const updateUserService = container.resolve(UpdateUserService);

  //   const user = await updateUserService.execute({name, email, password, id});

  //   return response.json(instanceToInstance(user));
  // }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const deleteUserService = container.resolve(DeleteUserService)

    await deleteUserService.execute(id);

    return response.status(200).json();
  }
}
