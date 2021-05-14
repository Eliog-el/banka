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
  return res.statusCode(statusCode).json({
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
  return res.statusCode(statusCode).json({
    data: {
      status: statusCode,
      error: message,
    },
  });
};
