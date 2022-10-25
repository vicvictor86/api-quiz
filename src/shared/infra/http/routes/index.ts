import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import questionsRouter from '@modules/questions/infra/http/routes/questions.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import alternativesRouter from '@modules/alternatives/infra/http/routes/alternatives.routes';
import statisticsRouter from '@modules/users/infra/http/routes/statistics.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/questions', questionsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/alternatives', alternativesRouter);
routes.use('/statistics', statisticsRouter);

export default routes;
