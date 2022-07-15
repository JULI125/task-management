import Joi from 'joi';

const registerSchema = Joi.object({
    names: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().required(),
    passwor: Joi.string().required()
});

export default registerSchema;