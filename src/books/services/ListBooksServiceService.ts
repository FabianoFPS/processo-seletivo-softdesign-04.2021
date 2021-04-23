import { IListAllBooksDTO } from '../../dtos/IListAllBooksDTO';
import { IBooksRepository } from '../../repositories/IBooksRepository';
import { Book } from '../../typeorm/schemas/Book';

export class ListBooksService {
  constructor(private bookRepository: IBooksRepository) {}

  public async execute({skip, take}: IListAllBooksDTO): Promise<Book[]> {
    return this.bookRepository.findAll({skip, take});
  }
}
