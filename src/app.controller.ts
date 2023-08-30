import { Controller, Get } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { ApiOperation } from "@nestjs/swagger";
import { AppHelth } from "@/app.interface";

@Controller()
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
