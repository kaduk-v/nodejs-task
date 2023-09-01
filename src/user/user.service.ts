import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/user/user.entity';

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

    async create() {
        const user = new User();

        user.firstName = 'vova';
        user.lastName = 'dev';
        user.isActive = true;

        return this.usersRepository.manager.save(user)
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
