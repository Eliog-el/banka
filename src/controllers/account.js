import { v4 as uuidv4 } from "uuid";
import {successResponse, errorResponse, getTableContents, wToFile,} from "../helpers/utilities";

export const createAccount = async (req, res) => {
      const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
      console.log(accountNumber)
      let user;

    try {
       const accounts = await getTableContents("users");
      //  console.log(users);
       user = accounts.find((user) => user.email === req.body.email);
    

      if (!user) { 
        return errorResponse(res, 404, 'User does not exists') 
      }
      if (!user.password) {
        return errorResponse(res, 403, 'incorrect password')
      }
      //  accounts = req.body;
      // const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
      // console.log(accountNumber)
      
      const accountObj = { ...user,  accountNumber};

  
       accounts.push(accountObj);
      wToFile('accounts', accounts)
  
      return successResponse(res, 200, "data", {
        ...accountObj,
        message: `Account number created successfully!`,
      });
    } catch (error) {
      console.log(error)
      errorResponse(res, 500, 'Unable to create account number!');
    }
  };
  