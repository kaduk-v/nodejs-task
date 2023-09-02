import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "@/user/user.service";
import { JwtService } from '@nestjs/jwt';
import { SignedInDto } from "@/auth/auth.dto";
import { compare } from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async signIn(username: string, password: string): Promise<SignedInDto> {
        const user = await this.userService.findOneBy({ name: username });

        if (user && compare(password, user.password)) {
            const payload = { sub: user.email, username: user.name, id: user.id };
            const token = await this.jwtService.signAsync(payload); // generate our JWT from a subset of the user

            return { accessToken: token };
        }

        throw new UnauthorizedException();
    }
}
