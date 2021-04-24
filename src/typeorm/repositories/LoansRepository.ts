import { getMongoRepository, MongoRepository } from 'typeorm';
import { ILoansRepository } from '../../repositories/ILoansRepository';
import { ILoanDTO } from '../../dtos/ILoanDTO';
import { Loan } from '../schemas/Loan';


export class LoanRepository implements ILoansRepository {
  private ormRepository: MongoRepository<Loan>;

  constructor() {
    this.ormRepository = getMongoRepository(Loan);
  }
  public async create({
    userId,
    bookId,
  }: ILoanDTO): Promise<Loan> {
    const loan = this.ormRepository.create({
      userId,
      bookId,
      active: true,
    });

    return this.ormRepository.save(loan);
  }

  public async findByBook(bookId: string): Promise<Loan | void> {
    return this.ormRepository.findOne({
      where: {
        bookId,
        active: true,
      }
    })
  }

  public async updatesLoanActiveToFalse({ bookId, userId }: ILoanDTO): Promise<Loan | void> {
    const loan = await this.ormRepository.findOne({
      where: {
        bookId,
        userId,
        active: true,
      }
    });

    if(!loan) throw new Error('Loan not found.');

    loan.active = false;

    return this.ormRepository.save(loan);
  }
}
