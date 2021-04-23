import { ILoanDTO } from "../../dtos/ILoanDTO";
import { IBooksRepository } from "../../repositories/IBooksRepository";
import { ILoansRepository } from "../../repositories/ILoansRepository";
import { Loan } from "../../typeorm/schemas/Loan";


export class CreateLoanService {
  constructor(
    private LoanRepository: ILoansRepository,
    private bookRepository: IBooksRepository,
  ) {}

  public async execute({
    bookId,
    userId,
  }: ILoanDTO): Promise<Loan> {
    const book = await this.bookRepository.findById(bookId);
    if(!book) throw new Error('Book not found.');

    const existingLoan = await this.LoanRepository.findByBook(bookId);
    if(existingLoan) throw new Error('Book not available.');

    return this.LoanRepository.create({
      bookId,
      userId,
    });
  }
}
