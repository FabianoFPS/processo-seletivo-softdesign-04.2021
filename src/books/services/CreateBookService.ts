import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';
import { IBooksRepository } from '../../repositories/IBooksRepository';
import { Book } from '../../typeorm/schemas/Book';

export class CreateBookService {
  constructor(private bookRepository: IBooksRepository) {}

  public async execute({
    title,
    creator,
    publisher,
    date,
  }: ICreateBookDTO): Promise<Book> {
    return this.bookRepository.create({
      title,
      creator,
      publisher,
      date,
    });
  }
}
