import { UUID } from "crypto";

export interface Account{
    id: number;
    Guid: UUID;
    userId: number;
    userGuid: UUID;
    bvn: string;
    nin: string;
    createdAt?: Date;
    updatedAt?: Date;
}