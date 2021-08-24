import { successResponse, errorResponse } from "../helpers/utilities";
import { v4 as uuidv4 } from "uuid";
import data from '../data/userData.js';

import accounts from "../data/userData"


export const createAccount = async (req, res) => {
    try {
      
      const account = req.body;
      
      const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
      
      const accountObj = { ...account, id: uuidv4(), accountNumber, firstName, Lastname, email};

  
      accounts.push(accountObj);
  
      return successResponse(res, 200, "data", {
        ...accountObj,
        message: `Account number created successfully!`,
      });
    } catch (err) {
      errorResponse(res, 500, 'Unable to create account number!');
    }
  };
  