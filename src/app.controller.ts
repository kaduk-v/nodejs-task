import { Controller, Get } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppHelth } from "@/app.interface";

@Controller()
@ApiTags('App')
export class AppController {
    constructor(private configService: ConfigService) {}

    @Get('health')
    @ApiOperation({ summary: 'Check app health' })
    checkHealth(): AppHelth {
        return {
            status: 'Ok',
            port: this.configService.get('port'),
            date: new Date()
        };
    }
}
