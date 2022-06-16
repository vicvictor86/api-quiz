import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async findAll(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find();

    return users;
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      }
    });

    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      }
    });

    return user;
  }

  public async save(userData: ICreateUserDTO): Promise<User> {
    throw new Error("Method not implemented.");
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
