import { Router, Request, Response } from 'express';

import { ensureAuthenticated } from '../../middleware/ensureAuthenticated';
import { BookRepository } from '../../typeorm/repositories/BooksRepository';
import { CreateBookService } from '../services/CreateBookService';
import { ListBooksService } from '../services/ListBooksServiceService';
import { FindBooksByTitleService } from '../services/FindBookByTitleService';
import { FindBooksByIdService } from '../services/FindBookByIDService';
import { Book } from '../../typeorm/schemas/Book';

export const bookRouter = Router();

bookRouter.use(ensureAuthenticated);

bookRouter.post(
  '/',
  async (request: Request, response: Response): Promise<Response> => {
    try {
      const { title, creator, publisher, date } = request.body;

      const createBook = new CreateBookService(new BookRepository());

      const book = await createBook.execute({
        title,
        creator,
        publisher,
        date,
      });

      return response.json(book);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
);

bookRouter.get(
  '/',
  async (request: Request, response: Response): Promise<Response> => {
    const { title, skip, take } = request.query;

    const skipBooks = (typeof skip === 'string') ? parseInt(skip) : 0;
    const takeBooks = (typeof take === 'string') ? parseInt(take) : 5;
    let books: Book[] = [];

    try {

      if (typeof title === 'string') {
        const findBook = new FindBooksByTitleService(new BookRepository());
        books = await findBook.execute({ title, skip: skipBooks, take: takeBooks });
      } else {
        const listBooks = new ListBooksService(new BookRepository());
        books = await listBooks.execute({ skip: skipBooks, take: takeBooks });
      }

      return response.json(books);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  });

bookRouter.get(
  '/:id',
  async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    try {
      const findBookById = new FindBooksByIdService(new BookRepository());
      const book = await findBookById.execute(id);
      return response.json(book);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  })
