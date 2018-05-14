import * as Consul from 'consul';
import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConsulOptions } from './consul.options';

@Global()
@Module({})
export class ConsulModule {
  static forRoot(options: ConsulOptions): DynamicModule {
    const connectionProvider = {
      provide: 'ConsulClient',
      useFactory: async (bootstrap): Promise<Consul> => {
        const consulOptions = options.bootstrap
          ? bootstrap.get(options.bootstrapPath)
          : options;
        return await new Consul({ ...consulOptions, promisify: true });
      },
      inject: [],
    };
    if (options.bootstrap) {
      connectionProvider.inject = ['BootstrapProvider'];
    }
    return {
      module: ConsulModule,
      components: [connectionProvider],
      exports: [connectionProvider],
    };
  }
}
