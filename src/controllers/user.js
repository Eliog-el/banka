// import { successResponse, errorResponse } from "../helpers";
require('dotenv').config();
import users from '../data/user';

import { successResponse, errorResponse } from '../helpers/utilities';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const { password, firstName } = req.validated;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const userObj = { ...user, id: uuidv4(), password: hashedPassword };

    return successResponse(res, 200, 'data', {
      ...userObj,
      message: `User with the name ${firstName} added to the database!`,
    });
  } catch (err) {
    errorResponse(res, 500, err);
    console.log(err);
  }
};

export const signIn = async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });

  if (!user) {
    return errorResponse(res, 404, 'User not found!');
  } else {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.send(
          successResponse(
            res,
            200,
            'data',
            {
              message: 'Signing In successful',
            },
            { accessToken: accessToken }
          )
        );
      } else {
        res.send('User not found');
      }
    } catch {
      res.status(500).send();
    }
  }
};
