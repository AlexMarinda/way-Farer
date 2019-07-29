import Joi from '@hapi/joi';


 // all validation operation 
 export class Validation {
 

  // user attributes validator

  static userValidator(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      first_name: Joi.string()
        .strict()
        .trim()
        .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
        .min(4)
        .max(30)
        .required(),
      last_name: Joi.string()
        .alphanum()
        .strict()
        .trim()
        .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
        .min(4)
        .max(30)
        .required(),
      password: Joi.string()
        .min(7)
        .max(50)
        .required(),

    });
    checkValidator(req, res, schema, next);
  }



}

export const checkValidator = (req, res, schema, next) => {
  const { error } = Joi.validate(req.body, schema, {abortEarly: false,convert: true });
  if (error) {
    const errors = [];
    const { details: errArr = [] } = error || {};
    errArr.forEach(err => {
      errors.push(err.message.split('"').join(''));
    });
    return res.status(400).json({ status: 'error', data: { 'message':errors} });
 
  }
  return next();

};


