import { Request, Response } from "express";
import { validateRegisterBody } from "./auth.validation";
import UserDoa from "../../models/user";
import bcrypt from 'bcrypt';
import _ from 'lodash';

const AuthController = {
    async CreateUser(req: Request, res: Response){
        const { error, value } = validateRegisterBody(req.body);
        if(error){
            return res.status(400).json({
                error,
              });
        }

        let user = await UserDoa.getUserByEmail(value.email);
        if(!user){
            return res.status(401).json({
                status: 'error',
                message: 'email address already taken',
              });
        }

        const salt = await bcrypt.genSalt();
        value.password = await bcrypt.hash(value.password, salt);

        user = await UserDoa.createUser(value);
        return res.status(201).json({
            status: 'success',
            message: 'user registration successful'
          });
    }
}

export default AuthController;