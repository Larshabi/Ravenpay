import _ from "lodash";
import { User } from "../models/interfaces/user.interface";

export const filterJwtPayload = (payload: User) =>{
    return _.pick(payload, ['id', 'email'])
}