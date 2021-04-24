import { expect, describe, beforeEach, it } from '@jest/globals';

import { CreateLoanService } from './CreateLoanService';
import { FakeBookRepository } from '../../repositories/fakes/FakeBooksRepository';
import { FakeLoanRepository } from '../../repositories/fakes/FakeLoansRepository';
import { CreateBookService } from '../../books/services/CreateBookService';
import { DevolutionLoanService } from './DevolutionLoanService';
import { Loan } from '../../typeorm/schemas/Loan';

let createLoan: CreateLoanService;
let createBook: CreateBookService;
let devolutionLoan: DevolutionLoanService;

const mock_user_id = '6080b300250794766ca64268';

describe('DevolutionLoan', () => {
  beforeEach(() => {
    const fakeLoanRepository = new FakeLoanRepository();
    const fakeBookRepository = new FakeBookRepository();

    createLoan = new CreateLoanService(
      fakeLoanRepository,
      fakeBookRepository
    );
    createBook = new CreateBookService(fakeBookRepository);
    devolutionLoan = new DevolutionLoanService(fakeLoanRepository);
  });

  it('Deve ser possível devolver um livro emprestado', async () => {
    const bookInfo = {
      title: 'Clean Code',
      creator: 'Martin, Robert C.',
      publisher: 'Alta Book',
      date: new Date(),
    };

    const book = await createBook.execute(bookInfo);

    const loan = await createLoan.execute({
      userId: mock_user_id,
      bookId: book.id.toString(),
    })

    const { bookId, userId } = loan;

    const expected = await devolutionLoan.execute({ bookId, userId });
    expect(expected).toBeInstanceOf(Loan);
    const { active } = expected as Loan;
    expect(active).toStrictEqual(false);
  });
});

