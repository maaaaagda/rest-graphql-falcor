import { ILogger } from "./ILogger";
import * as fs from "fs";

export class Logger implements ILogger {

    private readonly _filePath;

    constructor(filePath: string) {
        this._filePath = filePath;
    }

    public log(tool: string, collection: string, operation: string,
               operationDetails: string, size: number, TTFB: number): void {
        const csvLine = `${tool},${collection},${operation},${operationDetails},${size},${TTFB}`;
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
