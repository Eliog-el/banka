import { successResponse, errorResponse } from "../helpers/utilities";
import { v4 as uuidv4 } from "uuid";

let accounts = [];


export const createAccount = async (req, res) => {
    try {
      const account = req.body;
  
      const accountObj = { ...account, id: uuidv4() };
  
      accounts.push(accountObj);
  
      return successResponse(res, 200, "data", {
        ...accountObj,
        message: `Account added to the database!`,
      });
    } catch (err) {
      errorResponse(res, 500, 'invalid account number');
      console.log(err);
    }
  };
  