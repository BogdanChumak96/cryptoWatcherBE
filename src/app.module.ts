import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration/index';
import { User } from './user/models/user.model';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { WatchList } from './watchlist/models/watchlist.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        database: configService.get('db_name'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, WatchList],
      }),
    }),
    UserModule,
    AuthModule,
    TokenModule,
    WatchlistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
