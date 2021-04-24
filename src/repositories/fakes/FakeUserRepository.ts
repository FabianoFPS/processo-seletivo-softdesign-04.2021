import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../typeorm/schemas/User";
import { IUsersRepository } from "../IUserRepository";

export class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(
      user,
      {
        id: uuid(),
        name,
        email,
        password,
      }
    )
    this.users.push(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

}
