import { Account } from "../../models/interfaces/account.interface";
import Joi from "joi";

export const validateGenerateAccountBody = (payload:Partial<Account>) => {
    const schema = Joi.object({
      nin: Joi.string().required(),
      bvn: Joi.string().required()
    });
    return schema.validate(payload);
  };

  export const validateTransferBody = (payload:any) => {
    const schema = Joi.object({
      amount: Joi.number().required().greater(0).less(101),
      bank: Joi.string().required(),
      bank_code: Joi.string().required(),
      account_number: Joi.string().required(),
      account_name: Joi.string().required(),
      narration: Joi.string(),
      reference: Joi.string(),
      currency: Joi.string()
    });
    return schema.validate(payload);
  };
