export interface IMetricsResponse {
    timings: {
        wait: number,
        dns: number,
        firstByte: number,
        download: number,
        total: number
    };
    size: number;
    data: any;
}
