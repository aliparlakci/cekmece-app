import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Car } from "./car"
import { User } from "./user"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    total: number
 
    @Column()
    quantity: number
   
   
    @ManyToOne(type => Car)
    @JoinColumn()
    item: Car
 
    @ManyToOne(type => User, user=>user.id)
    @JoinColumn()
    user: User
}
