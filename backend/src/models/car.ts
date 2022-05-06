import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, Index, JoinColumn,  } from "typeorm"
import {  Cart } from "./cart"
import { Category } from "./category"
import { Distributor } from "./distributor"
import { Review } from "./review"

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number

    @Index({ fulltext: true })
    @Column()
    name: string

    @Column()
    model: number

    @Column()
    number: number

    @Column()
    quantity: number

    @Column()
    price: number

    @Column()
    warranty: number

    @ManyToOne(() => Distributor, (distributor) => distributor.cars, { cascade: true })
    distributor: Distributor

    @ManyToOne(() => Category, { cascade: true })
    category: Category

    @OneToMany(type => Cart, cart => cart.id)
    @JoinColumn()
    cart: Cart[]

    @OneToMany(() => Review, (review) => review.car)
    reviews: Review[]

    @Column({ default: 0 })
    unitsSold: number
}
