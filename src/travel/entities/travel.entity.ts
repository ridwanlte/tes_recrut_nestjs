import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderTravel } from "./orderTravel.entity";

@Entity()
export class Travel {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    id_bus: String

    @Column()
    code_travel: String

    @Column('integer')
    amount_seat: Number

    @Column({type: 'json'})
    available_seat: String[]

    @OneToMany(() => OrderTravel, (order) => order.travel, {eager: true})
    travel: OrderTravel[];
}
