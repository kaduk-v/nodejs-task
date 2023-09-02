import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityOptions, Repository } from 'typeorm';
import { User } from '@/user/user.entity';
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { CreateUserDto } from "@/auth/auth.dto";
import { hashSync } from "bcryptjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async findOneBy(where: FindOptionsWhere<any>): Promise<User | null> {
        return this.usersRepository.findOneBy(where);
    }

    async create(payload: CreateUserDto, ip: string): Promise<User> {
        const user = new User();
        const { email, username, password } = payload;

        user.name = username;
        user.password = hashSync(password, 10);
        user.email = email;
        user.ip = ip;

        return this.usersRepository.manager.save(user)
    }
}
