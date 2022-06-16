import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({name, email, password}: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if(userExists) {
      throw new AppError('Email already exists');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password
    });

    return user;
  }
}
