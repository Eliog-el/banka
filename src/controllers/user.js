// import { successResponse, errorResponse } from "../helpers";
require('dotenv').config();
import users from '../data/user';

import { successResponse, errorResponse } from '../helpers/utilities';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const { password, firstName, email } = req.validated;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const userObj = { id: uuidv4(), password: hashedPassword, email };

    users.push(userObj);

    return successResponse(res, 200, 'data', {
      ...userObj,
      message: `User with the name ${firstName} added to the database!`,
    });
  } catch (err) {
    errorResponse(res, 500, err);
  }
};

export const signIn = async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);

  console.log(users);
  if (!user) {
    return errorResponse(res, 404, 'User not found!');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.json(
      successResponse(res, 200, 'data', { message: 'Signing In successful' },
      )
    );
  };


}
