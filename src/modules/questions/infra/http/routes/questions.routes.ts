import { Router } from 'express';
import QuestionsController from '../controllers/QuestionsController';

const questionsRouter = Router();
const questionsController = new QuestionsController();

questionsRouter.post('/', questionsController.create);
questionsRouter.get('/', questionsController.show);
questionsRouter.get('/:id', questionsController.index);
questionsRouter.delete('/:id', questionsController.delete);

export default questionsRouter;
