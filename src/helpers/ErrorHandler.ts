import { NextFunction, Request, Response } from "express";

function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void{
    console.log({err});
    console.log({error: err.response})
    if(err.name === 'TokenExpiredError'){
         res.status(401)
        .json({
            message: 'Access Token Expired',
            name: err.name
        })
    }else{
        res.status(500).json({
            message: 'An error occured',
            name: err.kind
        })
    }   
}

export default ErrorHandler;