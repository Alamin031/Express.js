import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as adminControler from '../controllers/admin.controler';

const router = Router();

router.post('/signup', userController.signup);
router.post('/login1', userController.login1);
router.post('/admin/signup', adminControler.signup);
router.post('/admin/login', adminControler.login);


export default router;
