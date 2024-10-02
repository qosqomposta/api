import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'sqlite',
    driver: require('@libsql/sqlite3'),
    flags: 0x00000040,
    database: `${configService.get<string>(
        'TURSO_DATABASE_URL',
    )}?authToken=${configService.get<string>('TURSO_AUTH_TOKEN')}`,
    autoLoadEntities: true,
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
    logging: configService.get<string>('NODE_ENV') === 'development',
});
