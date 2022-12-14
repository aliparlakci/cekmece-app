import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, OneToOne } from "typeorm"
import { Car } from "./car"
import { User } from "./user"
import { OrderItem } from "./orderItem"

export type Ratings = 1 | 2 | 3 | 4 | 5

export enum ApprovalStatus {
    IN_PROGRESS = "in-progress",
    APPROVED = "approved",
}

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "tinyint",
        default: 3,
    })
    rating: number

    @Column({
        length: 1000,
        nullable: true,
    })
    comment: string

    @CreateDateColumn()
    createdDate: Date

    @Column({
        type: "enum",
        enum: ApprovalStatus,
        default: ApprovalStatus.IN_PROGRESS,
    })
    approvalStatus: ApprovalStatus

    @ManyToOne(() => Car, (car) => car.reviews, { cascade: true, onDelete: "CASCADE" })
    car: Car

    @ManyToOne(() => User, (user) => user.reviews, { cascade: true, onDelete: "CASCADE" })
    user: User

    @OneToOne(() => OrderItem, (orderItem) => orderItem.review, {
        cascade: true,
    })
    @JoinColumn()
    orderItem: OrderItem
}
