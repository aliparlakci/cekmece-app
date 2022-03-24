import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { Category } from "./category"
import { Distributor } from "./distributor"

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number

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
}
