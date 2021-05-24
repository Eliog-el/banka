import Joi from "@hapi/joi"

const authSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),

})

module.exports = {
    authSchema,
}