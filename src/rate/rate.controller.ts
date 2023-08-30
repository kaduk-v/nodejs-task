import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { HistoryRateFilterDto, CurrentRateFilterDto, CurrentRateDto, HistoryRateDto } from "@/rate/rate.dto";
import { RateService } from "@/rate/rate.service";

@Controller('rate')
@ApiTags('Rate')
export class RateController {
    constructor(private readonly rateService: RateService) {
    }

    @Get('current')
    @ApiOperation({ summary: 'Get current trading rate' })
    @ApiOkResponse({ type: CurrentRateDto })
    async getCurrentRate(@Query() filter: CurrentRateFilterDto) {
        return {
            symbol: 'BTCUSDT',
            timestamp: 23523523523,
            rate: 25235235.22355
        }
    }

    @Get('history')
    @ApiOperation({ summary: 'Get history trading rates' })
    @ApiOkResponse({ type: HistoryRateDto })
    async getHistoryRates(@Query() filter: HistoryRateFilterDto) {
        return {
            symbol: 'BTCUSDT',
            points: [
                {
                    timestamp: 1692817200,
                    rate: 26491.415888
                },
                {
                    timestamp: 1692820800,
                    rate: 26670.544025
                },
            ]
        }
    }

}
