import { sign, verify } from "jsonwebtoken";

const createTokens = (users) => {
  const accessToken = sign({ users }, process.env.ACCESS_TOKEN_SECRET)

  return accessToken
}

const validateToken = ( req, res, next) => {
  const accessToken = req.cookies("access-token")

  if (!accessToken) return res.status(400).json({ error: "User not Authenticated!" });

  try {
      const validToken = verify(accessToken, ACCESS_TOKEN_SECRET)
      if (validToken) {
        req.authenticated = true
        return next();
      }
  } catch(error) {
    return errorResponse(res, 500, 'An error occurred')
  }
};

export { createTokens, validateToken };