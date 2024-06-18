import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Credential{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string
}