import { UUID } from "crypto";

export interface Account{
    id: number;
    Guid: UUID;
    userId: number;
    bvn: string;
    nin: string;
    userGuid?: UUID;
    createdAt?: Date;
    updatedAt?: Date;
    accountNumber: string;
    accountName: string
    bankName: string;
    amount: string;
    reference: string;
}

export interface AccountResponse{
    reference: string;
    account_number: string;
    account_name: string;
    bank_name: string;
    fname: string;
    lname: string;
    customer_email: string;
    amount: string
}

export interface TransferRequest{
    amount: number;
    bank: string;
    bank_code: string;
    account_number: string;
    account_name: string;
    narration?: string;
    reference: string;
    currency?: string;
}

export interface TransferResponse{
    email: string;
    trx_ref: string;
    merchant_ref: string;
    amount: number;
    bank: string;
    bank_code: string;
    account_number: string;
    account_name: string;
    narration: string;
    fee: number;
    status: string;
    userId?: number;
}