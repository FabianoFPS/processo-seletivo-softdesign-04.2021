import { ILoanDTO } from "../../dtos/ILoanDTO";
import { ILoansRepository } from "../../repositories/ILoansRepository";
import { Loan } from "../../typeorm/schemas/Loan";


export class DevolutionLoanService {
  constructor(
    private LoanRepository: ILoansRepository,
  ) {}

  public async execute({
    bookId,
    userId,
  }: ILoanDTO): Promise<Loan | void> {

    return this.LoanRepository.updatesLoanActiveToFalse({
      bookId,
      userId,
    });
  }
}
