import { Module } from "@nestjs/common";
import { RateController } from "@/rate/rate.controller";
import { RateService } from "@/rate/rate.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TradeSymbol, Rate } from "@/rate/entity";

@Module({
    imports: [ TypeOrmModule.forFeature([ TradeSymbol, Rate ]) ],
    controllers: [ RateController ],
    providers: [ RateService ]
})
export class RateModule {
}
