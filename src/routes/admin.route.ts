import { Router } from 'express';
import * as adminControler from '../controllers/admin.controler';

const router = Router();

router.get('/getAllUsers', adminControler.getAllUsers);
router.get('/getUser/:id', adminControler.getUser);
router.get('/getAdminProfile', adminControler.getAdminProfile);
router.delete('/deleteUser/:id', adminControler.deleteUser);
router.put('/updateUser/:id', adminControler.updateUser);


export default router;
