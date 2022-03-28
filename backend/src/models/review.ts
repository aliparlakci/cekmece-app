import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm"
import { Car } from "./car"
import { User } from "./user"

export type Ratings = 1 | 2 | 3 | 4 | 5

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: [1, 2, 3, 4, 5],
        default: 5,
    })
    rating: Ratings

    @Column({
        length: 1000,
    })
    comment: string

    @CreateDateColumn()
    createdDate: Date

    @Column({
        type: "boolean",
        default: false,
    })
    isApproved: boolean

    @ManyToOne(() => Car, (car) => car.reviews, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "carId", referencedColumnName: "id" })
    car: Car

    @Column()
    carId: number

    @ManyToOne(() => User, (user) => user.reviews, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User

    @Column()
    userId: string
}
