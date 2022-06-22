import { Router } from 'express';
import multer from 'multer';
import UsersController from '../controllers/UsersController';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import uploadConfig from '@config/upload';
import AvatarController from '../controllers/AvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const avatarController = new AvatarController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.show);
usersRouter.get('/:id', usersController.index);
// usersRouter.get('/:id', usersController.update);
// usersRouter.delete('/:id', usersController.delete);

usersRouter.patch('/avatar', ensureAuthenticate, upload.single('avatar'), avatarController.update);

export default usersRouter;
