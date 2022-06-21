import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, OneToOne } from "typeorm"
import { Car } from "./car"
import { Order } from "./order"
import { Review } from "./review"

export enum OrderStatus {
    PROCESSING = "processing",
    INTRANSIT = "in-transit",
    DELIVERED = "delivered",
}

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    total: number

    @Column()
    quantity: number

    @ManyToOne(() => Car, (car) => car.orderItems)
    car: Car

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order

    @OneToOne(() => Review, (review) => review.orderItem)
    review: Review

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PROCESSING,
    })
    status: OrderStatus
}
