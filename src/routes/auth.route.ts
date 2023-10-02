import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/signup', userController.signup);
router.post('/login1', userController.login1);
router.get('/getUserProfile/:id', userController.getUserProfile);

export default router;
