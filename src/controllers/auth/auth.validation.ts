import Joi from "joi";
import { User } from "../../models/interfaces/user.interface";

export const validateRegisterBody = (payload:Partial<User>) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(payload);
  };

  export const validateUserLogin = (payload:Partial<User>) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    return schema.validate(payload);
  };