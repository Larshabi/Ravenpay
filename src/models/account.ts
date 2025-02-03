import db from "../db/database";
import { Account } from "./interfaces/account.interface";

const AccountDoa = {
    async createAccount(account: Partial<Account>){
        return await db<Account>('Accounts').insert(account);
    },
    async getAccountByUserId(id: number){
        return await db<Account>('Accounts').where('userId', id).first();
    }
}

export default AccountDoa;