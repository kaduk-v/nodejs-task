import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Rate } from "@/rate/entity/rate.entity";

@Entity('trade_symbols')
export class TradeSymbol {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(
        () => Rate,
        (rate) => rate.symbol,
        { onDelete: 'CASCADE' }
    )
    rates: Rate[];
}
