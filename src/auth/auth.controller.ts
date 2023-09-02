import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto, SignedInDto, SignInDto } from "@/auth/auth.dto";
import { AuthService } from "@/auth/auth.service";
import { RealIP } from "nestjs-real-ip";
import { UserService } from "@/user/user.service";

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: CreateUserDto })
    async registerUser(@Body() payload: CreateUserDto, @RealIP() ipAddress: string) {
        const user = await this.userService.findOneBy({ email: payload.email });

        if (user) {
            return { message: 'User already registered. Use your name and password to sign in' };
        }

        try {
            await this.userService.create(payload, ipAddress);

            return { message: 'New user registered. Now you can sign in using your name and password' };
        } catch (e) {
            throw new BadRequestException(`Cannot register the user. ${e.message}`)
        }
    }

    @ApiOperation({ summary: 'User Sing In' })
    @ApiBody({ type: SignInDto })
    @ApiOkResponse({ type: SignedInDto })
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        const { username, password } = signInDto;

        return this.authService.signIn(username, password);
    }

}
