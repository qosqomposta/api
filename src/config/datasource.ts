import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';

configDotenv({
    path: `.env.${process.env.NODE_ENV || ''}`,
});

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: process.env.NODE_ENV === 'development',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['src/db/migrations/*{.ts,.js}'],
    synchronize: false,
});
