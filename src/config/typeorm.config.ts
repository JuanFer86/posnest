import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
// import { Category } from '../categories/entities/category.entity';
// import { Product } from '../products/entities/product.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASS'),
  database: configService.get('DATABASE_NAME'),
  ssl: true,
  // logging: true,
  entities: [join(__dirname, '../../**/*.entity.{js, ts}')],
  // entities: [Product, Category], // use for seed info here
  synchronize: true,
});
