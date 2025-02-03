import { NextFunction, Request, Response } from "express";
import { validate } from "./jwt";
import dotenv from 'dotenv';
import {JwtPayload} from 'jsonwebtoken';
import { User } from "../models/interfaces/user.interface";

dotenv.config();

declare module 'express' {
    export interface Request {
      user?: JwtPayload;
    }
  }

const authorization = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const token: string | undefined = req.headers.authorization;
        if(!token || !token.startsWith("Bearer ")){
              res.status(401).json({
                message: "Unauthorized"
            })
            return;
        }
        const [, hash] = token?.split(' ');
        const payload = validate(hash, process.env.accessTokenSecret as string) as JwtPayload;

        if(payload.exp != undefined && Date.now() >= payload.exp * 1000){
             res.status(401).json({message: 'Access Token Expired'});
             return;
        }

        req.user = payload;
        next();
    }catch(error: any){
        next(error);
    }
}

export default authorization;