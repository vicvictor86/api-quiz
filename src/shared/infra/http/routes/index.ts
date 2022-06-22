import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import questionsRouter from '@modules/questions/infra/http/routes/questions.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import alternativesRouter from '@modules/alternatives/infra/http/routes/alternatives.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/questions', questionsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/alternatives', alternativesRouter);

export default routes;
