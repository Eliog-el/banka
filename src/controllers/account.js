import { v4 as uuidv4 } from "uuid";
import users from '../data/userData.js';
import { successResponse, errorResponse, getTableContents, wToFile } from '../helpers/utilities';


import accounts from "../data/userData"


export const createAccount = async (req, res) => {
  
    try {
      const { firstName, lastName, password, email } = req.body;
      const users = await getTableContents('users')

      console.log(users);

      users.find(user => user.email === email)
      if (!users) { 
        return errorResponse(res, 404, 'User does not exists') 
      }
      if (!users.password) {
        return errorResponse(res, 403, 'incorrect password')
      }
      const account = req.body;
      const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
      
      const accountObj = { ...account, id: uuidv4(), accountNumber, firstName, lastName, email };

  
      accounts.push(accountObj);
      wToFile('accounts', accounts)
  
      return successResponse(res, 200, "data", {
        ...accountObj,
        message: `Account number created successfully!`,
      });
    } catch (err) {
      errorResponse(res, 500, 'Unable to create account number!');
    }
  };
  