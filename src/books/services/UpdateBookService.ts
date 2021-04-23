import { IUpdateBookDTO } from '../../dtos/IUpdateBookDTO';
import { IBooksRepository } from '../../repositories/IBooksRepository';
import { ILoansRepository } from '../../repositories/ILoansRepository';
import { Book } from '../../typeorm/schemas/Book';

export class UpdateBookService {
  constructor(
    private bookRepository: IBooksRepository,
    private LoanRepository: ILoansRepository,
  ) {}

  public async execute({
    id,
    title,
    creator,
    publisher,
    date,
  }: IUpdateBookDTO): Promise<Book | void> {
    const bookIsOnLoan = await this.LoanRepository.findByBook(id);

    if(bookIsOnLoan) throw new Error('Book not available.');

    return this.bookRepository.update(
      {
        id,
        title,
        creator,
        publisher,
        date,
      }
    );
  }
}
