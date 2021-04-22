import { IUsersRepository } from "../../repositories/IUserRepository";
import IHashProvider from "../providers/hashProvider/IHashProvider";

interface Request {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  private readonly ERROR_MESSAGE = 'Incorret email or password.';

  constructor(
    private userRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<{ok: boolean}> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) throw new Error(this.ERROR_MESSAGE);

    const passwordMatched: boolean = await this.hashProvider.compareHash(password, user.password);

    if(!passwordMatched) throw new Error(this.ERROR_MESSAGE);

    return {ok: true};
  }
}
