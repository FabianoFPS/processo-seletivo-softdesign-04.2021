import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void | Response {

  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new Error('JWT token is missing');

    const [, token] = authHeader.split(' ');
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub
    }
    return next();
  } catch (error) {
    return response.json({ error: 'Invalid JWT token' });
  }

}
