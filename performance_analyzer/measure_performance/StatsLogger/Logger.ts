import { ILogger } from "./ILogger";
import * as fs from "fs";

export class Logger implements ILogger {

    private readonly _filePath;

    constructor(filePath: string) {
        this._filePath = filePath;
        fs.writeFile(this._filePath, "", () => {
            console.log("Created log file.", this._filePath);
        });
    }

    public log(dbSize: string, collectionSize: number, tool: string, collection: string, operation: string,
               operationDetails: string, size: number, request: number,
               TTFB: number, download: number, total: number): void {
        const csvLine = `${dbSize},${collectionSize},${tool},${collection},${operation},${operationDetails},${size},${request},${TTFB},${download},${total}`;
        this.writeToCsv(csvLine);
        console.log("Received metrics: ", csvLine);
    }

    private writeToCsv(csvLine: string): void {
        const writeStream = fs.createWriteStream(this._filePath, { flags: "a"});
        writeStream.write(csvLine + "\n", );
        writeStream.end();

        writeStream.on("error", (err) => {
            console.log(err);
        });
    }
}
