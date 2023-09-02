import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BadRequestException, Controller, Get, Query, UseGuards } from "@nestjs/common";
import { HistoryRateFilterDto, CurrentRateFilterDto, CurrentRateDto, HistoryRateDto } from "@/rate/rate.dto";
import { RateService } from "@/rate/rate.service";
import { AuthGuard } from "@/auth/auth.guard";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('rate')
@ApiTags('Rate')
export class RateController {
    constructor(private readonly rateService: RateService) {
    }

    @Get('current')
    @ApiOperation({ summary: 'Latest rate for a symbol' })
    @ApiOkResponse({ type: CurrentRateDto })
    async getCurrentRate(@Query() filter: CurrentRateFilterDto) {
        try {
            return await this.rateService.findSymbolCurrentRate(filter);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('history')
    @ApiOperation({ summary: 'History rates for a symbol' })
    @ApiOkResponse({ type: HistoryRateDto })
    async getHistoryRates(@Query() filter: HistoryRateFilterDto) {
        try {
            return await this.rateService.findHistoryRates(filter);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
