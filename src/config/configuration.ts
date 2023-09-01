require('dotenv').config();
import * as process from "process";

export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    database: {
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DATABASE || 'test',
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
    },
    binance: {
        priceEndpoint: '/api/v3/ticker/price',
        baseEndpoints: [
            'https://api.binance.com',
            'https://api-gcp.binance.com',
            'https://api1.binance.com',
            'https://api2.binance.com',
            'https://api3.binance.com',
            'https://api4.binance.com'
        ]
    },
    symbolsWhitelist: [ 'BTCUSDT', 'BNBUSDT' ]
});
