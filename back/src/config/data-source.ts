import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { Appointment } from "../entities/Appointment"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "lucas1234",
    database: "app_turnos",
    synchronize: true,
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
    // dropSchema: true,
})

export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credential);
export const AppointmentModel = AppDataSource.getRepository(Appointment);


