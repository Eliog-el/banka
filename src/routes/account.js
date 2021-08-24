import express from 'express'
import { createAccount } from '../controllers/account'
import Authenticator  from '../middleware/Authentication'


const router = express.Router();


router.post('/create', Authenticator.user, Authenticator.isStaff, createAccount);

export default router;