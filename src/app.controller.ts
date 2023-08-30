import { Controller, Get } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Controller('app/')
export class AppController {
    constructor(private configService: ConfigService) {}

    @Get('health')
    getHello() {
        return { 'status': 'ok', 'App port': this.configService.get('port') };
    }
}
