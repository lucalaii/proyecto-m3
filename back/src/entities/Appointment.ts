import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Appointment{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date:Date

    @Column()
    time: string

    @ManyToOne(() => User, user => user.appointments)
    users: User

    @Column()
    status: boolean
}