import { classToClass } from 'class-transformer';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users: User[] | PromiseLike<User[]> = [];

    const cachedUsers = this.cacheProvider.recover<User[]>(
      `provider-list:${user_id}`,
    );

    users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    // if (!cachedUsers) {
    //   users = await this.usersRepository.findAllProviders({
    //     except_user_id: user_id,
    //   });

    //   await this.cacheProvider.save(
    //     `provider-list:${user_id}`,
    //     classToClass(users),
    //   );
    // }

    return users;
  }
}

export default ListProvidersService;
