import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Car } from "./car"

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

    @Column("varchar", {
        length: 200,
    })
    comment: string

    @Column({
        type: "datetime",
    })
    date: string

    @Column({
        type: "boolean",
    })
    isApproved: boolean

    @Column()
    userId: number

    @ManyToOne(() => Car, (car) => car.reviews, { cascade: true })
    car: Car
}
