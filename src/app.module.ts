import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PicTemplateEntity } from './entity/PicTemplate.entity';
import { ThumbnailEntity } from './entity/thumbnail.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.253',
      port: 5432,
      username: 'admin',
      password: '123456',
      database: 'indexed',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([PicTemplateEntity, ThumbnailEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
