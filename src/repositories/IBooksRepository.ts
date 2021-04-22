import { ICreateBookDTO } from '../dtos/ICreateBookDTO';
import { Book } from '../typeorm/schemas/Book';

export interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
}
