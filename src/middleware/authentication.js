import jwt from "jsonwebtoken";
require("dotenv").config();
import { errorResponse, getTableContents } from "../helpers/utilities";

class Authenticator {
  static async user(req, res, next) {
    const codedToken = req.headers.authorization;
    if (!codedToken) {
      return errorResponse(res, 401, 'Authorization error');
    }
    const token = codedToken.split(' ')[1];
    try {
      const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => decoded);
      const theuser = await getTableContents('users', '*', { id: verify.id });
      if (!theuser[0]) {
        return errorResponse(res, 400, 'User doesn\'t exist');
      }
      req.body.loggedinUser = theuser[0];
    } catch (err) {
      return errorResponse(res, 401, 'Unauthorized user');
    }
    return next();
  }

  
  static async isClient(req, res, next) {
    const { loggedinUser } = req.body;
    if (loggedinUser.type === 'staff') {
      return errorResponse(res, 403, 'Forbidden, You Are not allowed to perform this action');
    }
    return next();
  }


  static async isStaff(req, res, next) {
    const { loggedinUser } = req.body;
    if (loggedinUser.type !== 'staff') {
      return errorResponse(res, 403, 'Forbidden, You Are not allowed to perform this action');
    }
    return next();
  }

  

  static async isAdmin(req, res, next) {
    const { loggedinUser } = req.body;
    if (loggedinUser.isadmin !== 'true') {
      return errorResponse(res, 403, 'Forbidden, You Are not allowed to perform this action');
    }
    return next();
  }
}

export default Authenticator;
