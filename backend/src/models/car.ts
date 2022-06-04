import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToMany,
    Index,
    JoinColumn,
} from "typeorm"
import { Cart } from "./cart"
import { Category } from "./category"
import { Distributor } from "./distributor"
import { Review } from "./review"
import { OrderItem } from "./orderItem"

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
    discount: number

    @Column()
    warranty: number

    @ManyToOne(() => Distributor, (distributor) => distributor.cars, { cascade: true })
    distributor: Distributor

    @ManyToOne(() => Category, { cascade: true })
    category: Category

    @OneToMany((type) => Cart, (cart) => cart.id)
    @JoinColumn()
    cart: Cart[]

    @OneToMany(() => OrderItem, (orderItem) => orderItem.car)
    orderItems: OrderItem[]

    @OneToMany(() => Review, (review) => review.car)
    reviews: Review[]

    @Column({ default: 0 })
    unitsSold: number

    @Column({ default: 0 })
    reviewCount: number

    @Column("decimal", { precision: 3, scale: 2, default: 0.0 })
    averageRating: number

    @Column({
        length: 1000,
        default: "Temporary description.",
    })
    description: string

    @Column({
        default: "https://i.imgur.com/awxaf0x.png",
    })
    photoUrl: string
}
