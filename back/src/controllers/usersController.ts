import { Request, Response } from "express";
import { getUsersService, getUsersByIdService, createUserService } from "../services/usersService";
import { createCredentialService, validateCredentialService } from "../services/credentialsService";
import { CredentialModel, UserModel } from "../config/data-source";

const getUsersController = async(req:Request, res:Response) => {
    try {
        const users = await getUsersService();
        res.status(200).json(users); 
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

const getUserIdController = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const user = await getUsersByIdService(Number(id));
        if(user)res.status(200).json(user);
        else res.status(404).json({message: "User not found"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

const registerController = async(req:Request, res:Response) => {
    try {
        const user = req.body;
        //user = {name, email, birthdate, dni, username, password}
        const newUser = await createUserService(user);
        res.status(200).json({message: "User registered", newUser});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

const loginController = async(req:Request, res:Response) => {
    try {
        const {username, password} = req.body;
        const credentialId = await validateCredentialService(username, password);
        if(credentialId){
        const user = await UserModel.findOne({
            where: { credentials: { id: credentialId } },
            relations: { appointments: true },
          });
          res.status(200).json({message: "User logged", user});
          return user;
        }
          else res.status(404).json({message: "Credential wrong"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export {
    getUsersController,
    getUserIdController,
    registerController,
    loginController
}