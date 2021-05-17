import express from 'express';
import { login, signUp } from '../controllers/user';

const router = express.Router();

router.post('/create',  login);




export default router;
