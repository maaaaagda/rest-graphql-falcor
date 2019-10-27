import * as dotenv from "dotenv";
import { IConfig } from "./IConfig";

export class Config implements IConfig {
  public PORT: number;
  public DB_URL: string;

  private readonly requiredEnvs: string[];

  constructor() {
    this.requiredEnvs = [
      "PORT",
      "DB_URL",
    ];
  }

  public loadConfiguration(): void {
    dotenv.config();

    for (const key of this.requiredEnvs) {
      if (!(key in process.env)) {
        throw new Error(`${key} is required, and is not specified in environment variables`);
      }
    }

    this.PORT = parseInt(process.env.PORT, 10);
    this.DB_URL = process.env.DB_URL;
  }
}
