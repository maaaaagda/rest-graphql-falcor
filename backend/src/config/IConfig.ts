export interface IConfig {
    PORT: number;
    DB_URL: string;
    JWT_SECRET: string;
    API_PREFIX: string;

    loadConfiguration(): void;
}
