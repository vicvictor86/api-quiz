import AppError from "@shared/errors/AppError";
import { inject } from "tsyringe";
import IUpdateUserDto from "../dtos/IUpdateUserDTO";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  // public async execute({id, name, email, password}: IUpdateUserDto): Promise<User>{
  //   const user = await this.usersRepository.findById(id);

  //   if(!user){
  //     throw new AppError('User not found')
  //   }

  //   const updatedUser = {
  //     ...user,
  //     name, email, password
  //   }

  //   return updatedUser;
  // }
}
