import { Request, Response } from "express";
import { getAppointmentsService,
         getAppointmentByIdService,
         createAppointmentService,
         canceledAppointmentService
         } from "../services/appointmentsService";

const getAppointmentsController = async(req:Request, res:Response) => {
  try {
    const appointment = await getAppointmentsService();
    if(appointment.length === 0)res.status(404).json({message: "No appointments"});
    else res.status(200).json(appointment);
  } catch (error: any) {
    res.status(500).json({message: error.message});
}
}

const getAppointmentIdController = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const appointment = await getAppointmentByIdService(Number(id));
        if(appointment)res.status(200).json(appointment);
        else res.status(404).json({message: "Appointment not found"});
      } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

const scheduleController = async(req:Request, res:Response) => {
    try {
        const appointment = await createAppointmentService(req.body);
        res.status(200).json({message: "Appointment created",appointment});
      } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

const cancelController = async(req:Request, res:Response) => {
    try {
        const id = req.body.id;
        const appointment = await canceledAppointmentService(id);
        res.status(200).json({message: "Appointment canceled", appointment});
      } catch (error: any) {
        const status = error.statusCode || 500;
        res.status(status).json({message: error.message});
    }
}

export {
    getAppointmentsController,
    getAppointmentIdController,
    scheduleController,
    cancelController
}