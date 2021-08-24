import fs from 'fs'

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

export const getTableContents = async (table) => {
  let data = await fs.readFileSync(`${__dirname}/../data/store.txt`)

  const store = JSON.parse(data.toString())
  data = store[table];

  return data
}

export const wToFile = async (table, table_data) => {
  fs.readFile(`${__dirname}/../data/store.txt`, (err, data) => {
    if(err) {
      throw Error(err.message)
    }
  
    const store = JSON.parse(data)
    store[table] = table_data

    fs.writeFileSync(`${__dirname}/../data/store.txt`, JSON.stringify(store), { flag: 'w' })

  })
}