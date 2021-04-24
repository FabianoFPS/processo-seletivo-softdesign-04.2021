import { expect, describe, beforeEach, it } from '@jest/globals';

import { FakeUserRepository } from '../../repositories/fakes/FakeUserRepository';
import { BCryptHashProvider } from '../providers/hashProvider/BCryptHashProvider';
import { CreateUserkService } from './CreateUserService';

let createUser: CreateUserkService;

describe('CreatUser', () => {
  beforeEach(() => {
    createUser = new CreateUserkService(
      new FakeUserRepository(),
      new BCryptHashProvider(),
      );
  });

  it('Deve ser capaz de criar um usuário', async () => {
    const userInfo = {
      name: 'Nome Sobrenome',
      email: 'email@email.com',
      password: '741963'
    };
    const user = await createUser.execute(userInfo);

    expect(user).toHaveProperty('id');
  });

  it('Não deve ser possivel criar um usuário com email que não seja único', async () => {
    const user1 = {
      name: 'user1 Sobrenome',
      email: 'email@email.com',
      password: '741963'
    };
    const user2 = {
      name: 'user2 Sobrenome',
      email: 'email@email.com',
      password: '741963'
    };

    await createUser.execute(user1);
    expect(createUser.execute(user2)).rejects.toBeInstanceOf(Error);
  });
})
