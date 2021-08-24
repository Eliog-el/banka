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
  const { error, value } = schema.validate(req.body);

  if (error) {
    return errorResponse(res, 400, error);
  }

  req.validated = value;
  next();
};
