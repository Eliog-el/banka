// import { successResponse, errorResponse } from "../helpers";
import { successResponse, errorResponse } from "../helpers/utilities";
import { v4 as uuidv4 } from "uuid";

export const login = async (req, res) => {
  try {
    const user = req.body;

    const userObj = { ...user, id: uuidv4() };

    users.push(userObj);

    return successResponse(res, 200, "data", {
      ...userObj,
      message: `User with the name ${user.firstName} added to the database!`,
    });
  } catch (err) {
    errorResponse(res, 500, err);
    console.log(err);
  }
};

let users = [];

export const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = users.filter((user) => user.email === email);

  if (!user) {
    errorResponse(res, 404, "User not found!");
  }

  if ((user.password = password)) {
    return successResponse(res, 200, "SignIn is successful!");
  }
};
