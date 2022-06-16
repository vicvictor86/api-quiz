import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
export default class ShowUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute(): Promise<User[]>{
    const users = await this.usersRepository.findAll();

    if(!users){
      return [];
    }

    return users;
  }
}
