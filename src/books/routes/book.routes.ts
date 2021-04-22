import { Router, Request, Response } from 'express';

import { BookRepository } from '../../typeorm/repositories/BooksRepository';
import { CreateBookService } from '../services/CreateBookService';

export const bookRouter = Router();

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
