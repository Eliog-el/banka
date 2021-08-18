import { v4 as uuidv4 } from "uuid";
import {successResponse, errorResponse, getTableContents, wToFile,} from "../helpers/utilities";

export const createAccount = async (req, res) => {
  let accountNumber = Math.floor(1000000000 + Math.random() * 9000000000); const openingBalance = 0
  // console.log(accountNumber);
  let user;
  const status = 'active';
  const owner = loggedinUser.id;
  const { type, loggedinUser } = req.body;

  try {
    const accounts = await getTableContents("users");
    await getTableContents('user', { accountNumber, owner, type, status, balance: openingBalance }); 
  } catch (error) {
    return errorResponse(res, 500, 'SERVER ERROR');
  }

  const { firstName, lastName, email } = loggedinUser;

  const datas = {
    accountNumber, firstName: firstName, lastName: lastName, email, type, openingBalance, 
  };

  return successResponse(res, 201, 'data', datas);




//     const accountsDetails = await getTableContents("accounts");
//     console.log(accountsDetails);
//     user = accounts.find((user) => user.email === req.body.email);

//     if (!user) {
//       return errorResponse(res, 404, "User does not exists");
//     }
//     if (!user.password) {
//       return errorResponse(res, 403, "incorrect password");
//     }

//     if (!accounts.accountNumber) {
//       const accountObj = { ...user, accountNumber };
//       accounts.push(accountObj);
//       wToFile("accounts", accounts);
//       return successResponse(res, 200, "data", {
//         ...accountObj,
//         message: `Account number created successfully!`,
//       });
//     } else {
//       errorResponse(res, 409, "accont number already created!");
//     }
//   } catch (error) {
//     console.log(error);
//     errorResponse(res, 500, "Unable to create account number!");
//   }
};
