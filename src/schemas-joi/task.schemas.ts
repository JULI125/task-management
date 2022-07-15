import Joi from 'joi';

const tareaSchema = Joi.object({
    image: Joi.string().required(),
    nameOfTheHomework: Joi.string().required(),
    priority: Joi.string().required(),
    date: Joi.date().required()
});

export default tareaSchema;