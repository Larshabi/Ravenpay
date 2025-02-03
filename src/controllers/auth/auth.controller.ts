import { Request, Response } from "express";
import { validateRegisterBody, validateUserLogin } from "./auth.validation";
import UserDoa from "../../models/user";
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { filterJwtPayload } from "../../helpers";
import { encode } from "../../helpers/jwt";

const AuthController = {
    async CreateUser(req: Request, res: Response){
        const { error, value } = validateRegisterBody(req.body);
        if(error){
            return res.status(400).json({
                error,
              });
        }

        let user = await UserDoa.getUserByEmail(value.email);
        if(user){
            return res.status(400).json({
                status: 'error',
                message: 'email address already taken',
              });
        }

        const salt = await bcrypt.genSalt();
        value.password = await bcrypt.hash(value.password, salt);

        await UserDoa.createUser(value);
        return res.status(201).json({
            status: 'success',
            message: 'user registration successful'
          });
    },
    async Login(req: Request, res: Response){
        const {error, value} = validateUserLogin(req.body);
        if(error){
            return res.status(400).json({error});
        }

        let user = await UserDoa.getUserByEmail(value.email);
        if(!user){
            return res.status(400).json({
                status:'error',
                message:'Email not registered'
            })
        }

        const isMatch = await bcrypt.compare(value.password, user.password);
        if(!isMatch){
            return res.status(400).json({
                status:'error',
                message:'Incorrect password'
            })
        }
        const filterPayload = filterJwtPayload(user);

        const accessToken = encode(filterPayload, process.env.accessTokenSecret as string, Number(process.env.accessTokenExpiresIn));
        const refreshToken = encode(filterPayload, process.env.refreshTokenSecret as string, Number(process.env.refreshTokenExpiresIn));

        const tokens = {
            accessToken,
            refreshToken
        }

        return res.status(200).json({
            status:'success',
            message:'Login successful',
            tokens
        })
    }
}

export default AuthController;