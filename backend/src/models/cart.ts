import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Car } from "./car"
import { User } from "./user"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(() => User, (user) => user.cart, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    user: User

    @OneToMany(() => Car, (car) => car.id)
    products: Car[]
}
