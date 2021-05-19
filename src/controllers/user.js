import { successResponse, errorResponse } from '../helpers';

export const login = async (req, res) => {
  try {
    const user = req.body;

    const userObj = { ...user, id: uuidv4() };

    users.push(userObj);

    return successResponse(res, 200, 'data', {
      ...user,
      message: `User with the name ${user.firstName} added to the database!`,
    });
  } catch (err) {
    errorResponse(res, 500, err);
  }
};
