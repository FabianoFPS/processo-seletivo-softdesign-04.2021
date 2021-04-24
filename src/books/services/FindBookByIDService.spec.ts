import { expect, describe, beforeEach, it } from '@jest/globals';

import { FakeBookRepository } from '../../repositories/fakes/FakeBooksRepository';
import { Book } from '../../typeorm/schemas/Book';
import { FindBooksByIdService } from './FindBookByIDService';

let findBookById: FindBooksByIdService;

describe('FindBookById', () => {
  beforeEach(() => {
    findBookById = new FindBooksByIdService(new FakeBookRepository());
  });

  it('Deve ser capaz encontrar um livro', async () => {
    const id = '6081dcfc2436906b78cb9eb0';

    const expected = await findBookById.execute(id);
    expect(expected).toBeInstanceOf(Book);
    const { title } = expected as Book;
    expect(title).toStrictEqual('New Way');
  });
})
