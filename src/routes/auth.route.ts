import { Router } from 'express';
import * as authControler from '../controllers/auth.controlers';

const router = Router();

router.post('/signup', authControler.signup);
router.post('/login', authControler.login);
router.post('/admin/signup', authControler.adminSignup);
router.post('/admin/login', authControler.adminLogin);


export default router;
