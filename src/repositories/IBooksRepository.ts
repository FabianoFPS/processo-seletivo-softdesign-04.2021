import { ICreateBookDTO } from '../dtos/ICreateBookDTO';
import { IFindBookByTitleDTO } from '../dtos/IFindBookByTitle.DTO';
import { IListAllBooksDTO } from '../dtos/IListAllBooksDTO';
import { Book } from '../typeorm/schemas/Book';

export interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  findAll(data: IListAllBooksDTO): Promise<Book[]>;
  findByTitle(data: IFindBookByTitleDTO): Promise<Book[]>;
  findById(id: string): Promise<Book | void>;
}
