import { sign } from 'jsonwebtoken';

import { IUsersRepository } from "../../repositories/IUserRepository";
import IHashProvider from "../providers/hashProvider/IHashProvider";
import authConfig from '../../config/auth';

interface Request {
  email: string;
  password: string;
}

interface UserResponse {
  name: string;
  email: string;
}

interface Response {
  user: UserResponse;
  token: string;
}

export class AuthenticateUserService {
  private readonly ERROR_MESSAGE = 'Incorret email or password.';

  constructor(
    private userRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error(this.ERROR_MESSAGE);

    const passwordMatched: boolean = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) throw new Error(this.ERROR_MESSAGE);

    const { secret, expiresIn } = authConfig.jwt;

    const subject = user.id.toString()

    const token = sign({},
      secret,
      {
        subject,
        expiresIn,
      });

    return {
      user: {
        email: user.email,
        name: user.name,
      }, token
    };
  }
}
