import { Router } from "express";
import { getUsersController,
        getUserIdController,
        registerController,
        loginController 
       } from "../controllers/usersController";

const routerUser = Router();

routerUser.get("/", getUsersController);
routerUser.get("/:id", getUserIdController);
routerUser.post("/register", registerController);
routerUser.post("/login", loginController);


export default routerUser;

