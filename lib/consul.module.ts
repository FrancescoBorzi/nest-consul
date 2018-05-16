import * as Consul from 'consul';
import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConsulOptions } from './consul.options';
import { Boot } from 'nest-boot';

@Global()
@Module({})
export class ConsulModule {
  static forRoot(options: ConsulOptions): DynamicModule {
    const consulProvider = {
      provide: 'ConsulClient',
      useFactory: async (boot: Boot): Promise<Consul> => {
        const consulOptions = options.useBootModule
          ? boot.get(options.bootPath)
          : options;
        return await new Consul({ ...consulOptions, promisify: true });
      },
      inject: [],
    };
    if (options.useBootModule) {
      consulProvider.inject = ['BootstrapProvider'];
    }
    return {
      module: ConsulModule,
      components: [consulProvider],
      exports: [consulProvider],
    };
  }
}
