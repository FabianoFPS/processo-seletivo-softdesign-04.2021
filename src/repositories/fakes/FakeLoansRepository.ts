import { v4 as uuid } from 'uuid';

import { ILoansRepository } from '../../repositories/ILoansRepository';
import { ILoanDTO } from '../../dtos/ILoanDTO';
import { Loan } from '../../typeorm/schemas/Loan';

export class FakeLoanRepository implements ILoansRepository {
  private loans: Loan[] = [];

  public async create({
    userId,
    bookId,
  }: ILoanDTO): Promise<Loan> {
    const loan = new Loan();
    Object.assign(
      loan,
      {
        id: uuid(),
        userId,
        bookId,
        active: true,
      }
    )

    this.loans.push(loan);

    return loan;
  }

  public async findByBook(bookId: string): Promise<Loan | void> {
    const loan = this.loans.find(loan => loan.bookId == bookId && loan.active === true);

    return loan;
  }

  public async updatesLoanActiveToFalse({ bookId, userId }: ILoanDTO): Promise<Loan | void> {
    const findIndex = this.loans.findIndex(findLoan => (
      findLoan.bookId === bookId &&
      findLoan.active === true
    ));

    if (findIndex === -1) throw new Error('Livro não emprestado');

    this.loans[findIndex].active = false;
    return this.loans[findIndex];
  }
}
