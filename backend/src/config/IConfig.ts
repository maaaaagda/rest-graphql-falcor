export interface IConfig {
    PORT: number;
    DB_URL: string;

    loadConfiguration(): void;
}
