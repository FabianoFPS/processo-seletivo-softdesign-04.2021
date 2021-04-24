import { expect, describe, beforeEach, it } from '@jest/globals';

import { FakeBookRepository } from '../../repositories/fakes/FakeBooksRepository';
import { ListBooksService } from './ListBooksServiceService';

let listBooks: ListBooksService;

describe('ListBooks', () => {
  beforeEach(() => {
    listBooks = new ListBooksService(new FakeBookRepository());
  });

  it('Deve ser capaz encontrar um livro', async () => {

    const expected = await listBooks.execute({ skip: 0, take: 1});
    expect(expected.length).toBeGreaterThan(0);

  });
})
