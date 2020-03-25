export interface IConfig {
    PORT: number;
    DB_URL: string;
    JWT_SECRET: string;
    API_PREFIX: string;
    PRODUCT_INTEGRATION_DATA: {
        appId: string,
        appKey: string
      };

    loadConfiguration(): void;
    isDev(): boolean;
}
