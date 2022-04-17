import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"
import * as bcrypt from "bcryptjs"
import { Review } from "./review"
import { Cart } from "./cart"

@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    @Length(4, 20)
    username: string

    @Column()
    @Length(4, 100)
    password: string

    @Column()
    @IsNotEmpty()
    role: string

    @Column()
    @IsNotEmpty()
    email: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[]

    @OneToMany(type => Cart, cart => cart.id)
    @JoinColumn()
    cart: Cart[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
