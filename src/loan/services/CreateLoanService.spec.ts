import { expect, describe, beforeEach, it } from '@jest/globals';

import { CreateLoanService } from './CreateLoanService';
import { FakeBookRepository } from '../../repositories/fakes/FakeBooksRepository';
import { FakeLoanRepository } from '../../repositories/fakes/FakeLoansRepository';
import { CreateBookService } from '../../books/services/CreateBookService';

let createLoan: CreateLoanService;
let createBook: CreateBookService;

const mock_user_id = '6080b300250794766ca64268';
const mock_book_id = '6081dcfc2436906b78cb9eb0';

describe('CreateLoan', () => {
  beforeEach(() => {
    const fakeLoanRepository = new FakeLoanRepository();
    const fakeBookRepository = new FakeBookRepository();

    createLoan = new CreateLoanService(
      fakeLoanRepository,
      fakeBookRepository
    );
    createBook = new CreateBookService(fakeBookRepository);
  });

  it('Deve ser possível emprestar um livro', async () => {
    const bookInfo = {
      title: 'Clean Code',
      creator: 'Martin, Robert C.',
      publisher: 'Alta Book',
      date: new Date(),
    };

    const book = await createBook.execute(bookInfo);

    const expected = await createLoan.execute({
      userId: mock_user_id,
      bookId: book.id.toString(),
    })

    expect(expected).toHaveProperty('id');
    expect(expected).toHaveProperty('userId');
    expect(expected).toHaveProperty('bookId');
    expect(expected.active).toStrictEqual(true);
  });

  it('Não deve ser possível emprestar um livro que não exista na base', async () => {

    expect(createLoan.execute({
      userId: mock_user_id,
      bookId: mock_book_id,
    })).rejects.toBeInstanceOf(Error);
  });

  it('Não deve ser possível emprestar um livro que já esteja emprestado', async () => {
    const bookInfo = {
      title: 'Clean Code',
      creator: 'Martin, Robert C.',
      publisher: 'Alta Book',
      date: new Date(),
    };

    const book = await createBook.execute(bookInfo);

    await createLoan.execute({
      userId: mock_user_id,
      bookId: book.id.toString(),
    })

    expect(createLoan.execute({
      userId: mock_user_id,
      bookId: book.id.toString(),
    })).rejects.toBeInstanceOf(Error);
  });
});
