require("dotenv").config();
import {
  successResponse,
  errorResponse,
  getTableContents,
  wToFile,
} from "../helpers/utilities";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { createTokens, validateToken } from "../helpers/token.js";

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
    user = users.find((user) => user.email === email);

    if (user) {
      return errorResponse(res, 409, "User already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userObj = await getTableContents(
      "users",
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        id: uuidv4(),
        password: hashedPassword,
      },
      "RETURNING id"
    );

    const { id } = userObj;
    if (!isadmin) {
      tokenObj = createTokens({ id });
    }

    users.push(userObj);
    wToFile("users", users);
    // delete userObj.password

    return successResponse(res, 200, "data", {
      ...users,
      token: createTokens(userObj),
      message: `User with the name ${firstName} added to the database!`,
    });
  } catch (error) {
    errorResponse(res, 500, "Internet server error");
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await getTableContents("users", "*", { email });
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "SERVER ERROR");
  }

  if (!user) {
    return errorResponse(res, 404, "User not found!");
  }
  if (user[0].hashpassword) {
    return errorResponse(res, 401, "Email or password not correct");
  }

  const { id, firstName, lastName, type, isadmin } = user[0];

  const tokenObj = { id };

  return successResponse(res, 200, "data", {
    firstName,
    lastName,
    isadmin,
    email,
    token: createTokens(tokenObj),
    id,
    type,
  });
};

export const getDetails = async (req, res) => {
  const { firstname, lastname, email } = req.body.loggedinUser;

  return util.successStatus(res, 200, "data", {
    firstName: firstname,
    lastName: lastname,
    email,
    profilePic: profilepic,
  });
}
