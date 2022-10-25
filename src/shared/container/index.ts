import { container } from "tsyringe";

import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import IQuestionsRepository from "@modules/questions/repositories/IQuestionsRepository";
import QuestionsRepository from "@modules/questions/infra/typeorm/repositories/QuestionsRepository";

import IAlternativesRepository from "@modules/alternatives/repositories/IAlternativesRepository";
import AlternativesRepository from "@modules/alternatives/infra/typeorm/repositories/AlternativesRepository";

import IUserQuestionAnswersRepository from "@modules/users/repositories/IUserQuestionAnswersRepository";
import UserQuestionAnswersRepository from "@modules/users/infra/typeorm/repositories/UserQuestionAnserwersRepository";

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IQuestionsRepository>('QuestionsRepository', QuestionsRepository);

container.registerSingleton<IAlternativesRepository>('AlternativesRepository', AlternativesRepository);

container.registerSingleton<IUserQuestionAnswersRepository>('UserQuestionAnswers', UserQuestionAnswersRepository);
