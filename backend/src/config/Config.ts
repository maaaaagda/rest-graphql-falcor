import * as dotenv from "dotenv";
import { injectable } from "inversify";
import { IConfig } from "./IConfig";

@injectable()
export class Config implements IConfig {
  public PORT: number;
  public DB_URL: string;

  private readonly requiredEnvs: string[];

  constructor() {
    this.requiredEnvs = [
      "PORT",
      "DB_URL",
    ];
    this.loadConfiguration();
  }

  public loadConfiguration(): void {
    dotenv.config();

    for (const key of this.requiredEnvs) {
      if (!process.env[key]) {
        throw new Error(`${key} is required, and is not specified in environment variables`);
      }
    }

    this.PORT = parseInt(process.env.PORT, 10);
    this.DB_URL = process.env.DB_URL;
  }
}
