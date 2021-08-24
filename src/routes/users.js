import express from 'express';
import { getDetails, signIn, signUp } from '../controllers/user';
import helpers from '../helpers';
import middlewares from '../middleware';
import Authenticator  from '../middleware/Authentication'

const { signupSchema, signinSchema } = helpers;
const { validate } = middlewares;

const router = express.Router();

router.get('/getAllUsers',  Authenticator.user, getDetails);

router.post('/signUp', validate(signupSchema), signUp);

router.post('/signup/:isAdmin', Authenticator.user, Authenticator.isAdmin, signUp);


router.post('/signIn',validate(signinSchema), signIn);

export default router;
