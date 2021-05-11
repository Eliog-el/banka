import express from 'express';

import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/signup', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`User with the name ${user.firstName} added to the database!`)
});


export default router;