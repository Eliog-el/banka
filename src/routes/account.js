import express from 'express'
import { createAccount } from '../controllers/account'

const router = express.Router();


router.post('/create', createAccount);

export default router;