import * as Consul from 'consul';
import {Module, DynamicModule, Global} from '@nestjs/common';
import {ConsulOptions} from './consul.options';

@Global()
@Module({})
export class ConsulModule {
    static forRoot(
        options: ConsulOptions,
    ): DynamicModule {
        const connectionProvider = {
            provide: 'ConsulClient',
            useFactory: async (): Promise<Consul> => await new Consul({...options, promisify: true}),
        };
        return {
            module: ConsulModule,
            components: [connectionProvider],
            exports: [connectionProvider],
        };
    }
}