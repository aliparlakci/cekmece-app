import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm"
import { Car } from "./car"
import { DeleteDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Car, (car) => car.category)
    cars: Car[]

    @DeleteDateColumn()
    deletedAt?: Date

    @Column({
        default: false
    })
    isDeleted: boolean
}
