import { expect, describe, beforeEach, it } from '@jest/globals';
import { CreateLoanService } from '../../loan/services/CreateLoanService';

import { FakeBookRepository } from '../../repositories/fakes/FakeBooksRepository';
import { FakeLoanRepository } from '../../repositories/fakes/FakeLoansRepository';
import { CreateBookService } from './CreateBookService';
import { DeleteBookService } from './DeleteBookService';

let createBook: CreateBookService;
let deleteBook: DeleteBookService;
let createLoan: CreateLoanService;
let fakeBookRepository: FakeBookRepository;
const mock_user_id = '6080b300250794766ca64268';

describe('DeleteBook', () => {
  beforeEach(() => {
    const fakeLoanRepository = new FakeLoanRepository();
    fakeBookRepository = new FakeBookRepository();

    createBook = new CreateBookService(fakeBookRepository);
    deleteBook = new DeleteBookService(
      fakeBookRepository,
      fakeLoanRepository ,
    );
    createLoan = new CreateLoanService(
      fakeLoanRepository,
      fakeBookRepository
    );
  });

  it('Deve ser capaz de deletar um Livro', async () => {
    const bookInfo = {
      title: 'Clean Code',
      creator: 'Martin, Robert C.',
      publisher: 'Alta Book',
      date: new Date(),
    };

    const book = await createBook.execute(bookInfo);
    const id = book.id.toString();
    await deleteBook.execute(id);

    const expected = await fakeBookRepository.findById(id);

    expect(expected).toBeUndefined();
  });

  it('Não deve ser possível deletar um livro emprestado', async () => {
    const bookInfo = {
      title: 'Clean Code',
      creator: 'Martin, Robert C.',
      publisher: 'Alta Book',
      date: new Date(),
    };

    const book = await createBook.execute(bookInfo);
    const id = book.id.toString();

    await createLoan.execute({
      userId: mock_user_id,
      bookId: id,
    })

    expect(deleteBook.execute(id)).rejects.toBeInstanceOf(Error)
  });
})
