import configuration from '@/config/configuration';
import { ApiProperty } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { DateRange } from "@/common/time.helper";

const configService: ConfigService = new ConfigService(configuration());

export class BaseRateFilterDto {
    @ApiProperty({
        type: String,
        name: 'symbol',
        description: 'Filter by trading symbol',
        example: 'BTCUSDT'
    })
    @IsNotEmpty({ message: "Required parameter 'symbol' is not provided" })
    @IsIn(configService.get('symbolWhitelist'), { message: 'Not supported trading symbol' })
    symbol: string;
}

export class CurrentRateFilterDto extends BaseRateFilterDto {
}

export class HistoryRateFilterDto extends BaseRateFilterDto {
    @ApiProperty({
        enum: [ DateRange.OneDay, DateRange.OneWeek, DateRange.TwoWeeks, DateRange.OneMonth ],
        name: 'range',
        description: 'Filter by a certain date range',
        example: DateRange.OneWeek,
        default: DateRange.OneDay
    })
    @IsOptional()
    range: DateRange = DateRange.OneDay;
}

export class RatePointDto {
    @ApiProperty({
        type: Number,
        name: 'timestamp',
        description: 'Rate timestamp',
        example: 1692820800
    })
    @Transform(({ value }) => Number(value))
    timestamp: number;

    @ApiProperty({
        type: Number,
        name: 'price',
        description: 'Token price',
        example: 26670.544025
    })
    @Transform(({ value }) => Number(value))
    price: number;
}

export class CurrentRateDto extends RatePointDto {
    @ApiProperty({
        type: String,
        name: 'symbol',
        description: 'Trading symbol',
        example: 'BTCUSDT'
    })
    @IsString()
    symbol: string;
}

export class HistoryRateDto {
    @ApiProperty({
        type: String,
        name: 'symbol',
        description: 'Trading symbol',
        example: 'BTCUSDT',
        required: true
    })
    @IsString()
    symbol: string;

    @ApiProperty({
        type: [ RatePointDto ],
        name: 'points',
        description: 'List of price points',
        required: true
    })
    points: RatePointDto[]
}
