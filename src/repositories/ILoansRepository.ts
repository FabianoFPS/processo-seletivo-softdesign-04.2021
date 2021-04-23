import { ILoanDTO } from '../dtos/ILoanDTO';
import { Loan } from '../typeorm/schemas/Loan';

export interface ILoansRepository {
  create(data: ILoanDTO): Promise<Loan>;
  findByBook(bookId: string): Promise<Loan | void>;
  updatesLoanActiveToFalse(data: ILoanDTO): Promise<Loan | void>;
}
