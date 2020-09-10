import { getRepository, Repository } from 'typeorm';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '../entities/UserToken';
import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';

class UserTokensRepository implements IUserTokensRepository {
  private users: User[];

  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async save(userToken: UserToken): Promise<void> {
    await this.ormRepository.save(userToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    this.save(userToken);

    // await this.ormRepository.save(userToken);

    return userToken;
  }

  public async create({ token, user_id }: ICreateUserTokenDTO): Promise<void> {
    // console.log(token, user_id);
    const userToken = this.ormRepository.create({
      token,
      user_id,
    });

    await this.save(userToken);
  }
}

export default UserTokensRepository;
