import { getMongoRepository, MongoRepository } from 'typeorm';

import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';
import { IFindBookByTitleDTO } from '../../dtos/IFindBookByTitle.DTO';
import { IListAllBooksDTO } from '../../dtos/IListAllBooksDTO';
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

  public async findAll({ skip, take }: IListAllBooksDTO): Promise<Book[]> {
    return this.ormRepository.find({
      skip,
      take,
    });
  }

  public async findByTitle({ title, skip, take }: IFindBookByTitleDTO): Promise<Book[]> {
    return this.ormRepository.find({
      where: {
        title
      },
      skip,
      take,
    });
  }

  public async findById(id: string): Promise<Book | void> {
    return this.ormRepository.findOne(id);
  }
}
