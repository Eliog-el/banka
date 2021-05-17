import express from 'express';
import users from './users';


const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Welcome back banka' });
});

router.use('/user', users);


export default router;
