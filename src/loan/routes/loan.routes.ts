import { Router, Request, Response } from 'express';

import { ensureAuthenticated } from '../../middleware/ensureAuthenticated';
import { CreateLoanService } from '../services/CreateLoanService';
import { DevolutionLoanService } from '../services/DevolutionLoanService';
import { LoanRepository } from '../../typeorm/repositories/LoansRepository';
import { BookRepository } from '../../typeorm/repositories/BooksRepository';

export const loanRouter = Router();

loanRouter.use(ensureAuthenticated);

loanRouter.post(
  '/:bookId',
  async (request: Request, response: Response): Promise<Response> => {
    const userId = request.user.id;
    const { bookId } = request.params;

    try {
      const createLoan = new CreateLoanService(
        new LoanRepository(),
        new BookRepository(),
      )

      const loan = await createLoan.execute({ bookId, userId });

      return response.json(loan);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
);

loanRouter.patch(
  '/:bookId/devolution',
  async (request: Request, response: Response): Promise<Response> => {
    const userId = request.user.id;
    const { bookId } = request.params;

    try {
      const devolutionLoan = new DevolutionLoanService(new LoanRepository);
      const loan = await devolutionLoan.execute({ bookId, userId });
      return response.json(loan);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
);
