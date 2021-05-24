import helpers from '../helpers';

const { errorResponse } = helpers;

/**
 * @
 * @description Validates a route
 * @param {Object} res - Request object
 * @param {Object} statusCode - status code
 * @param {Object} objectname - Object name
 * @param {Object} object - Response object
 * @memberof UserController
 */
export const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.validate(req.body);
    req.validated = validated;

    next();
  } catch (err) {
    return errorResponse(res, 400, err);
  }
};
