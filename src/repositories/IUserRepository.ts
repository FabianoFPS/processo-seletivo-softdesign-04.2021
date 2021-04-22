import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../typeorm/schemas/User';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
