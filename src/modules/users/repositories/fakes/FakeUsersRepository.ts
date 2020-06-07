import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const createdUser = new User();

    Object.assign(createdUser, { id: uuid() }, userData);
    this.users.push(createdUser);

    return createdUser;
  }

  public async save(createdUser: User): Promise<User> {
    const findIndex = this.users.findIndex(
      findUser => findUser.id === createdUser.id,
    );
    this.users[findIndex] = createdUser;

    return createdUser;
  }
}

export default UsersRepository;
