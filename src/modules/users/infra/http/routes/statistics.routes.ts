import { Router } from "express";
import StatisticsController from "../controllers/StatisticsController";
import ensureAuthenticate from "../middlewares/ensureAuthenticate";

const statisticsRouter = Router();
const statisticsController = new StatisticsController();

statisticsRouter.post('/', ensureAuthenticate, statisticsController.index);

export default statisticsRouter;
