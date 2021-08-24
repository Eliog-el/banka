import { v4 as uuidv4 } from "uuid";
import { accounts, transactions } from "../data/userData"
import { errorResponse, successResponse } from "../helpers/utilities";

const calulateBalance = (type, balance, amount) => {
  if (type === 'debit') {
    return balance - Math.abs(amount);
  }
  return balance + Math.abs(amount);
};

export const transaction = async (req, res) => {
  const {
    loggedinUser, accountNumber, amount, description, type,
  } = req.body;
  try {
    const account = accounts.find((account) => account.accountNumber === accountNumber)

    if (!account) {
      return errorResponse(res, 404, 'Account not found');
    }

    const { accountBalance, status } = account

    if (loggedinUser.isadmin === 'true' || loggedinUser.type === 'client') {
      return util.errorstatus(res, 403, 'Forbidden, You Are not allowed to perform this action');
    }

    // if (type === 'debit' && status === 'dormant') {
    //   return cannot do this on dormant account
    // }

    if (type === 'debit' && accountBalance < amount) {
      return errorstatus(res, 400, 'insuffcient fund');
    }


    const newBalance = calulateBalance(type, balance, amount);
    const transactions = transactions.push({
      type, amount, oldBalance: balance, newBalance, accountNumber, description, id: uuidv4()
    })

    const newAcounts = accounts.map((acc) => {
      if (acc.accountNumber === accountNumber) {
        return { ...acc, accountBalance: newBalance }
      }

      return acc;
    })

    accounts.splice(0)
    accounts.push(...newAcounts)

    wToFile('transactions', transactions)

    console.log(accounts)

    return successResponse(res, 200, 'data', {
      transactionId: transactions.id,
      accountNumber,
      amount,
      cashier: loggedinUser.id,
      transactionType: type,
      accountBalance: newBalance.toFixed(2),
      description
    });

  } catch (error) { errorResponse(res, 500, 'Server error'); }
}