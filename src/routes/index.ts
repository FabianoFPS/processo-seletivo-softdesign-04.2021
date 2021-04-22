import { Router } from 'express';
import { bookRouter } from '../books/routes/book.routes';
import { loanRouter } from '../loan/routes/loan.routes';
import { usersRouter } from '../users/routes/user.routes';

const routes = Router();
routes.use('/books', bookRouter);
routes.use('/users', usersRouter);
routes.use('/loan', loanRouter);

export default routes;
