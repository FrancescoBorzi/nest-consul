import { Inject } from '@nestjs/common';

export const InjectConsul = () => Inject('ConsulClient');
