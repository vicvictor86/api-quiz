import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import questionsRouter from '@modules/questions/infra/http/routes/questions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/questions', questionsRouter);

export default routes;
