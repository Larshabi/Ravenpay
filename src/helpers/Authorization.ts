import { NextFunction, Request, Response } from "express";
import { validate } from "./jwt";
import dotenv from 'dotenv';
import {JwtPayload} from 'jsonwebtoken';

dotenv.config();

declare module 'express' {
    export interface Request {
      user?: JwtPayload;
    }
  }

const authorization = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const token: string | undefined = req.headers.authorization;
        if(!token || !token.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const [, hash] = token.split(' ');
        const payload = validate(hash, process.env.accessTokenSecret as string) as JwtPayload;

        if(payload.exp != undefined && Date.now() >= payload.exp * 1000){
            return res.status(401).json({message: 'Access Token Expired'});
        }

        req.user = payload;
        next();
    }catch(error: any){
        next(error);
    }
}

export default authorization;