import express from 'express';
import { signIn, signUp } from '../controllers/user';
import helpers from '../helpers';
import middlewares from '../middleware';

const { signupSchema } = helpers;
const { validate } = middlewares;

const router = express.Router();

router.post('/signUp', validate(signupSchema), signUp);

router.post('/signIn', signIn);

export default router;
