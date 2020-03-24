import { MetricsResponse } from "./../types/Response";

export const initialMetricsResponse: MetricsResponse = {
    size: 0,
    timings: {
        wait: 0,
        dns: 0,
        firstByte: 0,
        download: 0,
        total: 0
    },
    data: null
};

export const recalculateMetrics = (metrics, res) => {
    const { size, timings } = metrics;
    return {
        timings: {
            wait: timings.wait + res.timings.phases.wait,
            dns: timings.dns + res.timings.phases.dns,
            firstByte: timings.firstByte + res.timings.phases.firstByte,
            download: timings.download + res.timings.phases.download,
            total: timings.total + res.timings.phases.total
        },
        size: size + res.body.length,
        data: null
    };
};