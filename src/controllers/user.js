// import { successResponse, errorResponse } from "../helpers";
require('dotenv').config();
import { successResponse, errorResponse, getTableContents, wToFile } from '../helpers/utilities';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
// import cookieParser from 'cookieParser'; 
import { createTokens, validateToken } from '../helpers/token.js';
import jwt from 'jsonwebtoken' 
import users from '../data/userData';

// app.use(cookieParser());

export const signUp = async (req, res) => {
  
  let type;
  let isAdmin
  let tokenObj;
  let user;

  if (!isAdmin) {
    isAdmin = false; type = 'client';
  } else {
    isAdmin = isadmin; type = 'staff';
  }
 
  try {
    const { firstName, lastName, password, email } = req.validated;
    const users = await getTableContents('users')
    // console.log(users)

    users.find(user => user.email === email)
    if (users) { return errorResponse(res, 409, 'User already exists') }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    // const id  = fetchedUser;
    // if (!isadmin) {
    // tokenObj = token({ id });
    // }

     const userObj = { first_name: firstName, last_name: lastName, email: email, id: uuidv4(), password: hashedPassword};

    users.push(userObj);

    wToFile('users', users)
    delete userObj.password

    return successResponse(res, 200, 'data', {
      ...userObj,
      token: createTokens(userObj),
      message: `User with the name ${firstName} added to the database!`,
    });

  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Internet server error');
  }
};

// export const signIn = async (req, res) => {
//   // const users = await getTableContents('users')
//   const user = users.find((user) => user.email === req.body.email);

//   console.log(user);

//   if (!user) {
//     return errorResponse(res, 404, 'User not found!');
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       successResponse(res, 200, 'data',);
//     } else {
//       return errorResponse(res, 401, 'Invalid username and password');
//     }
//   } catch (err) {
//     return errorResponse(res, 500, 'An error occurred');
//   }; 
// }

export const signIn = async (req, res) => {

  const user = users.find((user) => user.email === req.body.email);

  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  // res.json({ accessToken: accessToken })


  if (!user) {
    return errorResponse(res, 404, "User not found!");
  } else {
    const accessToken = createTokens(users)

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        successResponse(res, 200, "data", {
          message: 'Signing In successful',
        }, { accessToken: accessToken })
      } else {
        return errorResponse('User not found')
      }
    } catch {
     return errorResponse(res, 500, 'An error occurred');
    }
  }

};


// export const getDetails = async (req, res) => {
//   const { id } = req.params;

//   const foundUser = users.find((user) => user.id === id);

//   res.send(foundUser)
// }

// export const getAllUser = async (req, res) => {
//   var users_response = data.user;

//   return successResponse(res, 200, 'users', users_response);
// }
