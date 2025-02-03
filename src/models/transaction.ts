import db from "../db/database"
import { TransferResponse } from "./interfaces/account.interface";

const TransactionDoa = {
    async CreateTransaction(payload: TransferResponse){
        const transaction = {
            trx_ref: payload.trx_ref,
            merchant_ref: payload.merchant_ref,
            amount: payload.amount,
            bank: payload.bank,
            accountNumber: payload.account_number,
            status: payload.status,
            userId: payload.userId,
            accountName: payload.account_name,
            narration: payload.narration,
            fee: payload.fee
        }
        return await db('Transactions').insert(transaction);
    },
    async GetTransactionByReference(ref: string){
        return await db('Transactions').where('trx_ref', ref).first();
    },
    async UpdateTransactionByReference(ref: string, body: Partial<TransferResponse>){
        return await db('Transactions').where('trx_ref', ref).update(body);
    },
     
    async getTransactionsByUserId(userId: number){
        return await db('Transactions').where('userId', userId);
    }
}

export default TransactionDoa;