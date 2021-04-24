import { expect, describe, beforeEach, it } from '@jest/globals';

import { FakeBookRepository } from '../../repositories/fakes/FakeBooksRepository';
import { Book } from '../../typeorm/schemas/Book';
import { FindBooksByTitleService } from './FindBookByTitleService';

let findBookByTitle: FindBooksByTitleService;

describe('FindBookByTitle', () => {
  beforeEach(() => {
    findBookByTitle = new FindBooksByTitleService(new FakeBookRepository());
  });

  it('Deve ser capaz encontrar um livro', async () => {
    const title = 'New Way'

    const expected = await findBookByTitle.execute({title, skip: 0, take: 1});
    expect(expected[0]).toBeInstanceOf(Book);
    const { id } = expected[0] as Book;
    expect(id).toStrictEqual('6081dcfc2436906b78cb9eb0');
  });
})
