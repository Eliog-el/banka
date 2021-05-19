import express from 'express';
import { signIn, signUp } from '../controllers/user';

const router = express.Router();

router.post('/auth',  signUp);




export default router;
