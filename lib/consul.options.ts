export interface ConsulOptions {
    host: string;
    port: number;
    secure: boolean;
    ca: string[] | Buffer[];
    defaults: object;
}