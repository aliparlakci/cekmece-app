import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, OneToOne, JoinColumn} from "typeorm"
import {OrderItem} from "./orderItem";

@Entity()
export class RefundRequest {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => OrderItem, orderItem => orderItem.id)
    @JoinColumn()
    orderItem: OrderItem

    @Column({
        default: false
    })
    isApproved: boolean
}
