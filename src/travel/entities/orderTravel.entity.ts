import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Travel } from "./travel.entity";

@Entity()
export class OrderTravel {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    id_customer: String

    @Column('boolean', {default: true})
    is_booked: Boolean

    @Column({type: "datetime"})
    order_date: Date

    @Column('integer')
    id_seat: Number

    @ManyToOne(() => Travel, (trv) => trv.travel)
    @JoinColumn({name: 'travelId'})
    travel: Travel;
}
