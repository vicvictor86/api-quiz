import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
import QuestionsController from '../controllers/QuestionsController';

const questionsRouter = Router();

const questionsController = new QuestionsController();

questionsRouter.post('/', ensureAuthenticate, questionsController.create);
questionsRouter.get('/', questionsController.show);
questionsRouter.get('/:id', questionsController.index);
questionsRouter.delete('/:id', ensureAuthenticate, questionsController.delete);

export default questionsRouter;
