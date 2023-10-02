import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getUserProfile);
router.get('/getUserProfile/:id', userController.getUserProfile);


export default router;
