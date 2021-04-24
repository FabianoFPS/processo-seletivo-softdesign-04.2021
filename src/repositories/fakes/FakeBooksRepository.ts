import { v4 as uuid } from 'uuid';

import { ICreateBookDTO } from '../../dtos/ICreateBookDTO';
import { IFindBookByTitleDTO } from '../../dtos/IFindBookByTitle.DTO';
import { IListAllBooksDTO } from '../../dtos/IListAllBooksDTO';
import { IResponseDeleteDTO } from '../../dtos/IResponseDeleteBook';
import { IUpdateBookDTO } from '../../dtos/IUpdateBookDTO';
import { IBooksRepository } from '../../repositories/IBooksRepository';
import { Book } from '../../typeorm/schemas/Book';

export class FakeBookRepository implements IBooksRepository {
  private books: Book[] = [];

  constructor() {
    const book = new Book();
    Object.assign(
      book,
      {
        id: '6081dcfc2436906b78cb9eb0',
        title: 'New Way',
        creator: 'Susan Hulley',
        publisher: 'Lafayette',
        date: new Date(),
      }
    );

    this.books.push(book);
  }

  public async create({
    title,
    creator,
    date,
    publisher,
  }: ICreateBookDTO): Promise<Book> {
    const book = new Book();
    Object.assign(
      book,
      {
        id: uuid(),
        title,
        creator,
        publisher,
        date,
      }
    );

    this.books.push(book);

    return book;
  }

  public async findAll({ skip, take }: IListAllBooksDTO): Promise<Book[]> {
    return this.books;
  }

  public async findByTitle({ title, skip, take }: IFindBookByTitleDTO): Promise<Book[]> {
    return this.books.filter(book => book.title === title);
  }

  public async findById(id: string): Promise<Book | void> {
    return this.books.find(book => book.id.toString() === id);
  }

  public async update({
    id,
    title,
    creator,
    publisher,
    date,
  }: IUpdateBookDTO): Promise<Book | void> {
    const findIndex = this.books.findIndex(findBook => findBook.id.toString() === id);
    if (findIndex === -1) throw new Error('Livro não encontrado');

    const book = new Book();
    Object.assign(
      book,
      {
        id,
        title,
        creator,
        publisher,
        date,
      }
    );

    this.books[findIndex] = book;
    return this.books[findIndex];
  }

  public async delete(id: string): Promise<IResponseDeleteDTO> {
    const findIndex = this.books.findIndex(findBook => findBook.id.toString() === id);
    if (findIndex === -1) throw new Error('Livro não encontrado');

    this.books.splice(findIndex);

    return {message: `Book (${id}) deleted.`};
  }
}
