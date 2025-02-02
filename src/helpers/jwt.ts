import {JwtPayload, sign, verify} from 'jsonwebtoken';

export const encode =  (payload: object, secret:string, expiresIn: number): string => sign(payload, secret, {expiresIn})

export const validate = (token: string, secret: string): JwtPayload | string => verify(token, secret);