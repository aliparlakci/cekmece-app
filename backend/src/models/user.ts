import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Review } from "./review"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]
}
