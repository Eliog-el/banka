// import { successResponse, errorResponse } from "../helpers";
require("dotenv").config();
import {
  successResponse,
  errorResponse,
  getTableContents,
  wToFile,
} from "../helpers/utilities";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
// import cookieParser from 'cookieParser';
import { createTokens, validateToken } from "../helpers/token.js";
import jwt from "jsonwebtoken";
import users from "../data/userData";

// app.use(cookieParser());

export const signUp = async (req, res) => {
  let type;
  let isAdmin;
  let tokenObj;
  let user;

  if (!isAdmin) {
    isAdmin = false;
    type = "client";
  } else {
    isAdmin = isadmin;
    type = "staff";
  }

  try {
    const { firstName, lastName, password, email } = req.validated;
    const users = await getTableContents("users");

    const user = users.find((user) => user.email === email);

    if (user) {
      return errorResponse(res, 409, "User already exists");
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const userObj = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      id: uuidv4(),
      password: hashedPassword,
    };

    users.push(userObj);

    wToFile("users", users);
    // delete userObj.password

    return successResponse(res, 200, "data", {
      ...userObj,
      token: createTokens(userObj),
      message: `User with the name ${firstName} added to the database!`,
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Internet server error");
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  let user;

  try {
    const users = await getTableContents("users");
    user = users.find((user) => user.email === req.body.email);
    console.log(user);

    if (!user) {
      return errorResponse(res, 404, "User not found!");
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      successResponse(res, 200, "data");
    } else {
      return errorResponse(res, 401, "Invalid username and password");
    }

    const { id, firstName, lastName, type, isadmin } = user;

    // const tokenObj = { id };

    return successResponse(res, 200, "data", {
      ...user,
      token: createTokens(user),
      message: "User loggin!",
    });
  } catch (error) {
    return errorResponse(res, 500, "SERVER ERROR");
  }
};


export const getDetails = async (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);
};

export const getAllUser = async (req, res) => {
  var users_response = users;

  return successResponse(res, 200, "users", users_response);
};
