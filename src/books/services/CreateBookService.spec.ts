import { expect, describe, beforeEach, it } from '@jest/globals';

import { FakeBookRepository } from '../../repositories/fakes/FakeBooksRepository';
import { Book } from '../../typeorm/schemas/Book';
import { CreateBookService } from './CreateBookService';

let createBook: CreateBookService;

describe('CreatBook', () => {
  beforeEach(() => {
    createBook = new CreateBookService(new FakeBookRepository());
  });

  it('Deve ser capaz de criar registro e livro', async () => {
    const bookInfo = {
      title: 'Clean Code',
      creator: 'Martin, Robert C.',
      publisher: 'Alta Book',
      date: new Date(),
    };

    const expected = await createBook.execute(bookInfo);
    expect(expected).toBeInstanceOf(Book);
  });
})
