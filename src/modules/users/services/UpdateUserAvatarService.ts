import path from 'path';
import fs from 'fs';

import uploadConfig from'@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
  userId: string;
  avatarFileName: string | undefined;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({ userId, avatarFileName }: Request): Promise<User> {

    const user = await this.usersRepository.findById(userId);

    if(!user){
      throw new Error('Only authenticated users can change avatar.');
    }

    if(user.avatar){
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath);

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}
