export interface ILogger {
    log(tool: string, collection: string, operation: string,
        operationDetails: string, size: number, TTFB: number): void;
}
