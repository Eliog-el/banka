import express from 'express';
import users from './users';
import account  from './account';


const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Welcome back banka' });
});

router.use('/auth', users);

router.use('/account', account);


export default router;
