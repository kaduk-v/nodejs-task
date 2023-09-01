import { Controller, Get } from "@nestjs/common";
import { UserService } from "@/user/user.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private service: UserService) {
    }

    @Get('all')
    async test2() {
        return await this.service.findAll();
    }

    @Get('create')
    async test() {
        try {
            const user = await this.service.create();
            console.log('LOG: ', user)

            return user;
        } catch (e) {
            console.log('LOG: ', e)
        }
    }
}
