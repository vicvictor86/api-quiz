import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import ICreateSessionsDTO from "../dtos/ICreateSessionsDTO";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
export default class AuthenticateService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ){}

  public async execute({ email, password }: ICreateSessionsDTO): Promise<User>{
    const user = await this.userRepository.findByEmail(email);

    if(!user){
      throw new AppError('Email or password incorrect');
    }

    const hashedPassword = user.password;

    const authenticated = await compare(password, hashedPassword);

    if(!authenticated) {
      throw new AppError('Email or password incorrect');
    }

    return user;
  }
}
