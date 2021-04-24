import { expect, describe, beforeEach, it } from '@jest/globals';
import { CreateLoanService } from '../../loan/services/CreateLoanService';

import { FakeBookRepository } from '../../repositories/fakes/FakeBooksRepository';
import { FakeLoanRepository } from '../../repositories/fakes/FakeLoansRepository';
import { CreateBookService } from './CreateBookService';
import { UpdateBookService } from './UpdateBookService';

let createBook: CreateBookService;
let UpdateBook: UpdateBookService;
let createLoan: CreateLoanService;
let fakeBookRepository: FakeBookRepository;
const mock_user_id = '6080b300250794766ca64268';

describe('UpdateteBook', () => {
  beforeEach(() => {
    const fakeLoanRepository = new FakeLoanRepository();
    fakeBookRepository = new FakeBookRepository();

    createBook = new CreateBookService(fakeBookRepository);
    UpdateBook = new UpdateBookService(
      fakeBookRepository,
      fakeLoanRepository ,
    );
    createLoan = new CreateLoanService(
      fakeLoanRepository,
      fakeBookRepository
    );
  });

  it('Deve ser capaz de editar um Livro', async () => {
    const bookInfo = {
      title: 'Clean Code',
      creator: 'Martin, Robert C.',
      publisher: 'Alta Book',
      date: new Date(),
    };

    const book = await createBook.execute(bookInfo);
    const id = book.id.toString();
    const date = new Date();
    const newBookInfo = {
      id,
      title: 'Senhor dos Anéis',
      creator: 'Jon Do',
      publisher: 'Saraiva',
      date,
    };
    const expected = await UpdateBook.execute(newBookInfo);

    expect({...expected}).toStrictEqual(newBookInfo);
  });

  it('Não deve ser possível Editar um livro emprestado', async () => {
    const bookInfo = {
      title: 'Clean Code',
      creator: 'Martin, Robert C.',
      publisher: 'Alta Book',
      date: new Date(),
    };

    const book = await createBook.execute(bookInfo);
    const id = book.id.toString();
    const newBookInfo = {
      id,
      title: 'Senhor dos Anéis',
      creator: 'Jon Do',
      publisher: 'Saraiva',
      date: new Date(),
    };

    await createLoan.execute({
      userId: mock_user_id,
      bookId: id,
    })

    expect(UpdateBook.execute(newBookInfo)).rejects.toBeInstanceOf(Error)
  });
})
