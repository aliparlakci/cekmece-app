import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, Index } from "typeorm"
import { Cart } from "./cart"
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

    @ManyToMany(() => Category, { cascade: true })
    @JoinTable()
    categories: Category[]

    @ManyToMany(() => Cart,cart=>cart.products)
    carts: Cart[]

    @OneToMany(() => Review, (review) => review.car)
    reviews: Review[]
}
