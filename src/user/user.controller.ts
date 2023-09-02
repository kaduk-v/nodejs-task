import { Controller, Get } from "@nestjs/common";
import { UserService } from "@/user/user.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private service: UserService) {
    }

}
