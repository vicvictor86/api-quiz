import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
export default class IndexUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  public async execute(id: string): Promise<User>{
    const user = await this.usersRepository.findById(id);

    if(!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
