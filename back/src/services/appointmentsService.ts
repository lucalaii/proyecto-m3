import { Appointment } from "../entities/Appointment";
import { AppointmentModel, UserModel } from "../config/data-source";
import { appointmentDto } from "../interfaces/IAppointment";

export const getAppointmentsService = async(): Promise<Appointment[]> => {
    try {
        const appointments = await AppointmentModel.find({
            relations: ["users"]
        });
        return appointments;     
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getAppointmentByIdService = async(id: number): Promise<Appointment | null> => {
    try {
        const appointment = await AppointmentModel.findOne({ 
            where: { id },
            relations: ["users"] 
        });
        return appointment;     
    } catch (error: any) {
        throw new Error(error);
    }
}

export const createAppointmentService = async(appointment: appointmentDto): Promise<Appointment> => {
    try {
       const user = await UserModel.findOneBy({id: appointment.userId})
       if (!user) {
        throw new Error('User not found');
       } 
       const newAppointment = await AppointmentModel.save({
        date: appointment.date,
        time: appointment.time,
        users: user,
        status: true
       })
        
        return newAppointment;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const canceledAppointmentService = async(id: number): Promise<Appointment> => {
    try {
        const appointment = await getAppointmentByIdService(id);
        if (!appointment)  throw {message: "Appointment not found", statusCode: 404};
        appointment.status = false;
        const updatedAppointment = await AppointmentModel.save(appointment);
        return updatedAppointment;
    } catch (error: any) {
        throw error;
    }
}