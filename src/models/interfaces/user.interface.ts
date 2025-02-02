import { UUID } from "crypto";

export interface User{
    id: number;
    Guid: UUID;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}