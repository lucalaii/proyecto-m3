import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"

@Entity({
    name: "users"
})
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    dni: number

    @Column()
    email: string

    @Column()
    birthdate: string

    @OneToOne(() => Credential, credential => credential.id)
    @JoinColumn({name: "credentialId"})
    credentials: Credential

    @OneToMany(() => Appointment, appointment => appointment.users)
    appointments: Appointment[] 
}