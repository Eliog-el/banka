// import { successResponse, errorResponse } from "../helpers";
import { successResponse, errorResponse } from "../helpers/utilities";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = req.body;

    const userObj = { ...user, id: uuidv4(), password: hashedPassword };
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

export const signIn = async (req, res) => {

  const user = users.find((user) => user.email === req.body.email);

  if (!user) {
    return errorResponse(res, 404, "User not found!");
  }
  
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('success')
    } else {
      res.send('Not alloweed')
    }
  } catch {
    res.status(500).send()
  }

};
