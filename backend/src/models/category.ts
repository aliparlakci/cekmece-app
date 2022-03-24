import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Car } from "./car"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Car, (car) => car.categories)
    cars: Car[]
}
