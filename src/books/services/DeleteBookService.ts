import { IResponseDeleteDTO } from '../../dtos/IResponseDeleteBook';
import { IBooksRepository } from '../../repositories/IBooksRepository';
import { ILoansRepository } from '../../repositories/ILoansRepository';

export class DeleteBookService {
  constructor(
    private bookRepository: IBooksRepository,
    private LoanRepository: ILoansRepository,
  ) {}

  public async execute(id: string): Promise<IResponseDeleteDTO> {
    const bookIsOnLoan = await this.LoanRepository.findByBook(id);

    if(bookIsOnLoan) throw new Error('Book not available.');

    return this.bookRepository.delete(id);
  }
}
