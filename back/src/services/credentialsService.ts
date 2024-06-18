import { ICredential } from "../interfaces/ICredential";
import { credentials } from "../db/credentialsDb";
import { AppDataSource, CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";

export const createCredentialService = async(username: string, password: string): Promise<number> => {
    try {
       const credential = await CredentialModel.save({
        username,
        password
       });
       return credential.id;
   } catch (error: any) {
    throw new Error(error);
   }     
}

export const validateCredentialService = async(username: string, password: string): Promise<number | null> => {
    try {
        const credential = await CredentialModel.findOneBy({username, password});
        if(credential)return credential.id;
    } catch (error: any) {
        throw new Error(error);
    } 
    return null; 
}
