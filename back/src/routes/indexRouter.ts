import { Router, Request, Response } from "express";
import routerUser from "./usersRouter";
import routerAppointment from "./appointmentsRouter";

const router = Router();

router.get("/",(req: Request, res: Response)=>{
    res.status(200).send("Hello World");
})

router.use("/users", routerUser);
router.use("/appointments", routerAppointment);

export default router;
