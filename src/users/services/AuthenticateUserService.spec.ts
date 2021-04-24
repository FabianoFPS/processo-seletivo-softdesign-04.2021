import { expect, describe, beforeEach, it } from '@jest/globals';

import { FakeUserRepository } from '../../repositories/fakes/FakeUserRepository';
import { BCryptHashProvider } from '../providers/hashProvider/BCryptHashProvider';
import { AuthenticateUserService } from './AuthenticateUserService';
import { CreateUserkService } from './CreateUserService';

let authenticateUser: AuthenticateUserService;
let createUser: CreateUserkService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    const fakeUserRepository = new FakeUserRepository();
    const bCryptHashProvider = new BCryptHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      bCryptHashProvider,
    );
    createUser = new CreateUserkService(
      fakeUserRepository,
      bCryptHashProvider,
    );
  });

  it('Deve ser possível autenticar um usuário com as credenciais corretas', async () => {
    const userAuth = {
      name: 'Nome Sobrenome',
      email: 'email@email.com',
      password: '741963'
    };

    await createUser.execute(userAuth);
    const espected = await authenticateUser.execute({
      email: userAuth.email,
      password: userAuth.password,
    });

    expect(espected).toHaveProperty('token');
  });

  it('Não deve ser possível autenticar um usuário com as credenciais incorretas', async () => {
    const userAuth = {
      name: 'Nome Sobrenome',
      email: 'email@email.com',
      password: '741963'
    };

    await createUser.execute(userAuth);

    authenticateUser.execute({
      email: userAuth.email,
      password: 'passwordwrong',
    })

    expect(authenticateUser.execute({
      email: userAuth.email,
      password: 'passwordwrong',
    })).rejects.toBeInstanceOf(Error);
  });
});
