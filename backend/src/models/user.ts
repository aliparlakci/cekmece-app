import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Cart } from "./cart"
import { Review } from "./review"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]

    @OneToMany(type => Cart, cart => cart.id)
    @JoinColumn()
    cart: Cart[]

}
