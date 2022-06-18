import { Router } from "express";
import AlternativesController from "../controllers/AlternativesController";

const alternativesRouter = Router();
const alternativesController = new AlternativesController();

alternativesRouter.post('/', alternativesController.create);
alternativesRouter.get('/', alternativesController.show);

export default alternativesRouter;
