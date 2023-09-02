import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column()
    ip: string;
}
