export interface ILogger {
    log(dbSize: string, tool: string, collection: string, operation: string,
        operationDetails: string, size: number, TTFB: number): void;
}
