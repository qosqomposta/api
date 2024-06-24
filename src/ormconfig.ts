import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: '../../qosqompostaDB.db',
    // entities: [__dirname + '../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    //Remove in production
    synchronize: true,
};
