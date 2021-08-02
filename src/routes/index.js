import express from 'express';
import users from './users';
import account  from './account';
import transaction from './transaction';


const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Welcome back banka' });
});

router.use('/auth', users);

router.use('/account', account);

router.use('/transaction', transaction);


export default router;
