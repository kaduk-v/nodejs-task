import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    PrimaryColumn,
    ManyToOne,
    Index,
    UpdateDateColumn
} from 'typeorm';
import { TradeSymbol } from "@/rate/entity/trade-symbol.entity";

@Entity('rates')
@Index("symbol_hour_UQ", [ "symbol", "hourIndex" ], { unique: true })
export class Rate {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TradeSymbol, (symbol: TradeSymbol) => symbol.rates)
    symbol: TradeSymbol;

    @Column({ type: 'float' })
    rate: number;

    @Column({ type: 'integer' })
    hourIndex: number;

    @Column({ type: 'integer', comment: 'Hour start timestamp' })
    timestamp: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
