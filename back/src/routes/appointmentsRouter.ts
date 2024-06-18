import { Router } from "express";
import { getAppointmentsController,
         getAppointmentIdController,
         scheduleController,
         cancelController 
        } from "../controllers/appointmentsController";

const routerAppointment = Router();

routerAppointment.get("/", getAppointmentsController);
routerAppointment.get("/:id", getAppointmentIdController);
routerAppointment.post("/schedule", scheduleController);
routerAppointment.put("/cancel", cancelController);

export default routerAppointment;