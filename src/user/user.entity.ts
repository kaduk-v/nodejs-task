import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: "date", default: () => 'NOW()' })
    createdAt?: Date;
}
