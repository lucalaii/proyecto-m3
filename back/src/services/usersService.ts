import { AppDataSource, CredentialModel, UserModel } from "../config/data-source";
import {  UserDto } from "../interfaces/IUser";
import { createCredentialService } from "./credentialsService";
import { User } from "../entities/User";

export const getUsersService = async(): Promise<User[]> =>{
    try {
         const users = await UserModel.find({
            relations: ['credentials', 'appointments']
        });
        return users;    
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getUsersByIdService = async(id: number): Promise<User | null> => {
    try {
        const user = await UserModel.findOne({
            where: {id},
            relations: ["appointments"],
        });
        return user;     
    } catch (error: any) {
        throw new Error(error);
    }
}

export const createUserService = async(user: UserDto): Promise<User> => {
    try {
        const credentialId = await createCredentialService(user.username, user.password);
        const credential = await CredentialModel.findOneBy({id: credentialId});
        if (!credential) {
            throw new Error('Credential not found');
        }

        const existingUser = await UserModel.findOneBy({dni: user.dni});
        if (existingUser) {
            throw new Error('DNI ya existe');
        } 
        
        const newUser = await UserModel.save({
            name: user.name,
            dni: user.dni,
            email: user.email,
            birthdate: user.birthdate,
            credentials: credential,
            appointments: user.appointments,
        });
        return newUser;   
    } catch (error: any) {
        throw new Error(error);
    }
}
