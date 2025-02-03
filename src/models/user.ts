import knex from "knex"
import { User } from "./interfaces/user.interface"
import exp from "constants";
import db from "../db/database";

const UserDoa = {
    async getUserByEmail(email: string){
        const user = await db<User>('Users').where('email', email).first();
        return user;
    },
    async createUser(payload: Partial<User>){
        await db<User>('Users').insert(payload)
    }
}

export default UserDoa;