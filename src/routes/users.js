import express from 'express';
import { signIn, signUp } from '../controllers/user';

const router = express.Router();

router.post('/signUp',  signUp);

router.post('/get', signUp);

export default router;
