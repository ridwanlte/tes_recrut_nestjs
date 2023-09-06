import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Promo {
    @PrimaryGeneratedColumn('increment')
    id: Number

    @Column()
    code_promo: String

    @Column('integer')
    remind_quota: Number

    @Column('boolean', {default: true})
    is_available: Boolean
    
}
