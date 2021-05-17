/**
 * @
 * @description creates sends a postive response
 * @param {Object} res - Request object
 * @param {Object} statusCode - status code
 * @param {Object} objectname - Object name
 * @param {Object} object - Response object
 * @memberof UserController
 */
export const successResponse = (res, statusCode, objectname, object) => {
  return res.status(statusCode).json({
    data: {
      status: statusCode,
      [objectname]: object,
    },
  });
};

/**
 * @
 * @description creates sends a postive response
 * @param {Object} res - Request object
 * @param {Object} statusCode - status code
 * @param {Object} objectname - Object name
 * @param {Object} object - Response object
 * @memberof UserController
 */
export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    data: {
      status: statusCode,
      error: message,
    },
  });
};
