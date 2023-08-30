import { Module } from "@nestjs/common";
import { RateController } from "@/rate/rate.controller";
import { RateService } from "@/rate/rate.service";

@Module({
    controllers: [ RateController ],
    providers: [ RateService ]
})
export class RateModule {
}
