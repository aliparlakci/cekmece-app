import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from "typeorm"
import * as bcrypt from "bcryptjs"

import { Review } from "./review"
import { Cart } from "./cart"
import { Order } from "./order"

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string

    @Column()
    displayName: string

    @Column()
    password: string

    @Column()
    role: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]

    @OneToMany((type) => Cart, (cart) => cart.id)
    @JoinColumn()
    cart: Cart[]

    setPassword(plainPassword: string) {
        this.password = bcrypt.hashSync(plainPassword, 8)
    }

    verifyPassword(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
}
