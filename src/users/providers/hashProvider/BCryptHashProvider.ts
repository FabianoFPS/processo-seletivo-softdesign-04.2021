import { hash, compare } from 'bcryptjs';

const SALT = 8;

export class BCryptHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, SALT);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
