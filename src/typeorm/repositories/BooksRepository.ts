import { getMongoRepository, MongoRepository } from 'typeorm';

import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';
import { IBooksRepository } from '../../repositories/IBooksRepository';
import { Book } from '../schemas/Book';

export class BookRepository implements IBooksRepository {
  private ormRepository: MongoRepository<Book>;

  constructor() {
    this.ormRepository = getMongoRepository(Book);
  }

  public async create({
    title,
    creator,
    date,
    publisher,
  }: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create({
      title,
      creator,
      publisher,
      date,
    });

    return this.ormRepository.save(book);
  }
}
