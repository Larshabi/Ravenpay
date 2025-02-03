import { Request, Response } from "express";
import UserDoa from "../../models/user";
import {  validateTransferBody } from "./account.validation";
import axios from "axios";
import AccountDoa from "../../models/account";
import { TransferRequest, TransferResponse } from "../../models/interfaces/account.interface";
import TransactionDoa from "../../models/transaction";



const AccountController = {
    async GenerateAccount(req: Request, res: Response){

        const user = await UserDoa.getUserByEmail(req.user?.email);
        if(!user){
            return res.status(400).json({
                message:'Invalid user'
            })
        }

        const accountBody = {
            first_name: user.firstName,
            last_name: user.lastName,
            phone: user.phoneNumber,
            email: user.email,
            amount: '1000'
        }

        const createAccount = await axios.post(`${process.env.RavenpayBankBaseUrl}pwbt/generate_account`, accountBody, { headers:{
            'Authorization': `Bearer ${process.env.RAVENPAYLIVETESTSECRET}`,
             'Content-Type': 'application/json'}});
        if(!createAccount.data){
            return res.status(400).json({
                message: 'error creating merchant'
            })
        }
        const accountData = createAccount.data as unknown as any;
        
         await AccountDoa.createAccount({
            userId: user.id,
            accountNumber:accountData.data.account_number,
            accountName: accountData?.data.account_name,
            bankName: accountData?.data.bank,
            amount: accountData?.data.amount,
            userGuid: user.Guid
        });

        return res.status(201).json({
            message:'account generated successfully',
            account: accountData
        })
    },

    async Transfer(req: Request, res: Response){
        const {error, value} = validateTransferBody(req.body);
        if(error){
            return res.status(400).json({
                error
            })
        }
        const account = await AccountDoa.getAccountByUserId(req.user?.id);
        if(!account){
            return res.status(400).json({
                message: 'Account not found'
            })
        }

        if(Number(account.amount) < Number(value.amount)){
            return res.status(400).json({
                message: 'Insufficient funds'
            })
        }

        const data = value as TransferRequest;
        const transfer = await axios.post(`${process.env.RavenpayBankBaseUrl}transfers/create`, data, { headers: {
            'Authorization': `Bearer ${process.env.RAVENPAYLIVETESTSECRET}`
        }})

        if(transfer.status !== 200){
            return res.status(400).json({
                message: "Unable to transfer at the moment. Please try again later"
            })
        }
        const transactionPayload = transfer.data as TransferResponse;
        await TransactionDoa.CreateTransaction({...transactionPayload, userId: req.user?.id});        
        return res.status(200).json({

        })
    },

    async Webhook(req: Request, res: Response){
        let transaction = await TransactionDoa.GetTransactionByReference(req.body.trx_ref);
        if(!transaction) return res.status(400).json({
            message: 'invalid transaction'
        })
        

        await TransactionDoa.UpdateTransactionByReference(req.body.trx_ref, {status: req.body.status});
        return res.status(200).json({
            message: 'Transaction updated succesfully'
        })
    },

    async TransactionHistory(req: Request, res: Response){
        const transactions = await TransactionDoa.getTransactionsByUserId(req.user?.id);
        return res.status(200).json({
            status:'success',
            transactions
        })
    }
}

export default AccountController;