import { ILogger } from "./ILogger";

export class Logger implements ILogger {
    public info(message: string): void {
        this.log(message);
    }

    public warn(message: string): void {
        this.log(message);
    }

    public error(message: string): void {
        this.log(message);
    }

    private log(message: string): void {
        console.log(message);
    }
}
