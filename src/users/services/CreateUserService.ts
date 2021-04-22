import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { User } from '../../typeorm/schemas/User';
import IHashProvider from '../providers/hashProvider/IHashProvider';

export class CreateUserkService {
  constructor(
    private userRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) throw new Error('Email adress already used.');

    const hashdPassword = await this.hashProvider.generateHash(password);

    return this.userRepository.create({
      name,
      email,
      password: hashdPassword,
    });
  }
}
