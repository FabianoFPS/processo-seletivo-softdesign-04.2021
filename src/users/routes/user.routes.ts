import { Router, Request, Response } from 'express';

import { UserRepository } from '../../typeorm/repositories/UsersRepository';
import { CreateUserkService } from '../services/CreateUserService';
import { AuthenticateUserService } from '../services/AuthenticateUserService';
import { BCryptHashProvider } from '../providers/hashProvider/BCryptHashProvider';

export const usersRouter = Router();

const hashProvider = new BCryptHashProvider();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const createUser = new CreateUserkService(
      new UserRepository(),
      hashProvider,
    );

    const { name, email, password } = request.body;

    const createdUser = await createUser.execute({ name, email, password });

    return response.json(createdUser);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRouter.post('/sessions', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthenticateUserService(
      new UserRepository(),
      hashProvider,
    );
    const { user, token } = await authenticateUser.execute({ email, password });

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});
