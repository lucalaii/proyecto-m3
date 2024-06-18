import { Appointment } from "../entities/Appointment";
import { ICredential } from "./ICredential"

export interface IUser{
    id: number,
    name: string,
    dni: number,
    email: string,
    birthdate: string,
    credentialId: ICredential["id"],
}

export class UserDto{
    name: string;
    dni: number;
    email: string;
    birthdate: string;
    username: string;
    password: string;
    appointments: Appointment[];
}