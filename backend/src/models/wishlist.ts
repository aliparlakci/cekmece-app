import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
    ManyToOne,
    DeleteDateColumn
} from "typeorm"
import { Car } from "./car"
import { User } from "./user"

@Entity()
export class WishlistItem {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @ManyToOne(type => Car, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    item: Car
 
    @ManyToOne(type => User, user=>user.id)
    @JoinColumn()
    user: User

    @DeleteDateColumn()
    deletedAt?: Date
}
