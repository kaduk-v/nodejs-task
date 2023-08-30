export enum RateRange {
    OneDay = '1d',
    OneWeek = '1w',
    TwoWeeks = '2w',
    OneMonth = '1m',
}

export interface RatePoint {
    timestamp: number;
    rate: number;
}
