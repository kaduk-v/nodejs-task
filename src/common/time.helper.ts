// timestamp is in seconds
export enum UnixTimestamp {
    OneHour = 3600,
    OneDay = 86400,
    OneWeek = 604800,
    TwoWeeks = 1209600,
    OneMonth = 2592000
}

export enum DateRange {
    OneDay = '1d',
    OneWeek = '1w',
    TwoWeeks = '2w',
    OneMonth = '1m',
}

export const getTimestampByDateRane = (range: DateRange): number => {
    const currentTimestamp = ~~(Date.now() / 1000);

    switch (range) {
        case DateRange.OneDay:
            return currentTimestamp - UnixTimestamp.OneDay;
        case DateRange.OneWeek:
            return currentTimestamp - UnixTimestamp.OneWeek;
        case DateRange.TwoWeeks:
            return currentTimestamp - UnixTimestamp.TwoWeeks;
        case DateRange.OneMonth:
            return currentTimestamp - UnixTimestamp.OneMonth;
    }
}
