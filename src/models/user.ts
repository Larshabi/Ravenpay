import knex from "knex"
import { User } from "./interfaces/user.interface"
import exp from "constants";

const UserDoa = {
    async getUserByEmail(email: string){
        const user = await knex<User>('Users').where('email', email).first();
        return user.email;
    },
    async createUser(payload: Partial<User>){
        await knex<User>('Users').insert(payload)
    }
}

export default UserDoa;