import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Car } from "./car"
import { User } from "./user"

@Entity()
export class WishlistItem {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @ManyToOne(type => Car)
    @JoinColumn()
    item: Car
 
    @ManyToOne(type => User, user=>user.id)
    @JoinColumn()
    user: User
}
