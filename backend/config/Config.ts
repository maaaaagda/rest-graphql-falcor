import * as dotenv from 'dotenv';
import { IConfig } from './IConfig';

export class Config implements IConfig {
  public PORT: string;

  private readonly requiredEnvs: string[];

  constructor() {
    this.requiredEnvs = [
      "PORT",
    ];
  }

  public loadConfiguration(): void {
    dotenv.config();

    for (const key of this.requiredEnvs) {
      if (!(key in process.env)) {
        throw `${key} is required, and is not specified in environment variables`;
      }
      this[key] = process.env[key];
    }
  }
}