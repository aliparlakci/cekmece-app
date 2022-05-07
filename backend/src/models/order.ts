import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm"
import { User } from "./user"
import { Review } from "./review"
import { OrderItem } from "./orderItem"

export enum OrderStatus {
    PROCESSING = "processing",
    INTRANSIT = "in-transit",
    DELIVERED = "delivered",
}

export enum ShippingOption {
    FREE = "free",
    ONEDAY = "one-day",
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    // Items cost
    @Column()
    subTotal: number

    // Shipping cost
    @Column({
        default: 0,
    })
    shipping: number

    // Discount applied with promotion code
    @Column({
        default: 0,
    })
    discount: number

    // Items cost (subtotal) + shipping cost - discount
    @Column()
    total: number

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PROCESSING,
    })
    status: OrderStatus

    @Column({
        default: null,
        nullable: true,
        length: 50,
    })
    promoCode: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    // BEGIN: ADDRESS DETAILS

    @Column({
        length: 50,
    })
    addressLine1: string

    @Column({
        length: 50,
        nullable: true,
    })
    addressLine2: string

    @Column({
        length: 50,
    })
    city: string

    @Column({
        length: 50,
        nullable: true,
    })
    province: string

    @Column()
    zipCode: number

    @Column({
        length: 50,
    })
    country: string

    // END: ADDRESS DETAILS

    @Column({
        type: "enum",
        enum: ShippingOption,
        default: ShippingOption.FREE,
    })
    shippingOption: ShippingOption

    @ManyToOne(() => User, (user) => user.orders, { cascade: true, onDelete: "CASCADE" })
    user: User

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true, onDelete: "CASCADE" })
    orderItems: OrderItem[]
}
