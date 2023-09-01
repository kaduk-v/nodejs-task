import axios, { AxiosResponse } from 'axios';
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Rate, TradeSymbol } from "@/rate/entity";
import { Repository } from "typeorm";
import { SymbolPrice } from "@/rate/rate.interface";
import {
    CurrentRateDto,
    CurrentRateFilterDto,
    HistoryRateDto,
    HistoryRateFilterDto,
    RatePointDto
} from "@/rate/rate.dto";
import { getTimestampByDateRane, UnixTimestamp } from "@/common/time.helper";

@Injectable()
export class RateService {
    private apiBaseUrl: string;
    private apiPriceEndpoint: string;

    constructor(
        private config: ConfigService,
        @InjectRepository(TradeSymbol)
        private symbolRepository: Repository<TradeSymbol>,
        @InjectRepository(Rate)
        private rateRepository: Repository<Rate>,
    ) {
        this.apiBaseUrl = this.config.get('binance')['baseEndpoints'][0];
        this.apiPriceEndpoint = this.config.get('binance')['priceEndpoint'];
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async fetchRates(numberErrors: number = 0) {
        try {
            const symbols: TradeSymbol[] = await this.symbolRepository.find();
            const prices: SymbolPrice[] = await this.fetchSymbolsPrices(symbols);

            await this.updateSymbolPrices(symbols, prices);
        } catch (e) {
            console.error('Cannot fetch rates.', e.message);

            numberErrors++;

            const baseEndpoints: string[] = this.config.get('binance')['baseEndpoints'];
            if (numberErrors < baseEndpoints.length) {
                // try to use other available base endpoint
                this.apiBaseUrl = baseEndpoints[numberErrors];

                await this.fetchRates(numberErrors)
            } else {
                console.error('Number of attempts has been reached')
            }
        }
    }

    async findSymbolCurrentRate(filter: CurrentRateFilterDto): Promise<CurrentRateDto> {
        const rate: Rate = await this.rateRepository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.symbol', 's')
            .select([ 's.name', 'r.rate', 'r.timestamp' ])
            .where('s.name = :name', { name: filter.symbol })
            .orderBy('r.updatedAt', 'DESC')
            .getOne();

        if (!rate) {
            throw new Error('Cannot find rate by passed symbol');
        }

        const currentRate = new CurrentRateDto();

        currentRate.symbol = rate.symbol.name;
        currentRate.timestamp = rate.timestamp;
        currentRate.rate = rate.rate;

        return currentRate;
    }

    async findHistoryRates(filter: HistoryRateFilterDto): Promise<HistoryRateDto> {
        const symbol = await this.symbolRepository
            .createQueryBuilder('s')
            .leftJoinAndSelect('s.rates', 'r')
            .select([ 's.name', 'r.rate', 'r.timestamp' ])
            .where('s.name = :name AND r.timestamp > :timestamp', {
                name: filter.symbol,
                timestamp: getTimestampByDateRane(filter.range)
            })
            .orderBy('r.updatedAt', 'DESC')
            .getOne();

        if (!symbol) {
            throw new Error('Cannot find any rates by passed parameters')
        }

        const historyRates = new HistoryRateDto();

        historyRates.symbol = symbol.name;
        historyRates.points = symbol.rates.map(rate => {
            const point = new RatePointDto();

            point.rate = rate.rate;
            point.timestamp = rate.timestamp;

            return point;
        });

        return historyRates;
    }

    private async fetchSymbolsPrices(symbols: TradeSymbol[]): Promise<SymbolPrice[]> {
        const response: AxiosResponse = await axios.request({
            url: this.apiPriceEndpoint,
            method: 'GET',
            baseURL: this.apiBaseUrl,
            params: { symbols: JSON.stringify(symbols.map(symbol => symbol.name)) }
        });

        return response.data;
    }

    private async updateSymbolPrices(symbols: TradeSymbol[], prices: SymbolPrice[]) {
        const currentTimestamp = Date.now() / 1000;
        const hourIndex = ~~(currentTimestamp / UnixTimestamp.OneHour);
        const hourStarUnix = hourIndex * UnixTimestamp.OneHour;
        const data = [];

        for (const symbol of symbols) {
            const rate = prices.find(price => price.symbol === symbol.name).price;

            if (!rate) {
                console.error(`Cannot find price for symbol - ${symbol.name}`);
                continue;
            }

            data.push({
                rate: parseFloat(rate),
                timestamp: hourStarUnix,
                hourIndex: hourIndex,
                symbol
            });
        }

        try {
            await this.rateRepository
                .createQueryBuilder()
                .insert()
                .into(Rate)
                .values(data)
                .orUpdate(
                    [ "rate", "updatedAt" ],
                    [ "symbolId", "hourIndex" ]
                )
                .execute();

            data.map(item => console.log(`[Updated] ${item['symbol'].name} - ${item['rate']}`))
        } catch (e) {
            console.error('Cannot update rates.', e.message);
        }
    }
}
