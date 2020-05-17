export interface ILogger {
    log(dbSize: string, collectionSize: number, tool: string, collection: string, operation: string,
        operationDetails: string, size: number, wait: number,
        TTFB: number, download: number, total: number, firstByteData: string,
        downloadData: string, totalData: string): void;
}
