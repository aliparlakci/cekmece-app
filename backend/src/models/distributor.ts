import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Car } from "./car"

@Entity()
export class Distributor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Car, (car) => car.distributor)
    cars: Car[]
}
