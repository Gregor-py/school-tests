import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoDbConfig } from './config/mongo.config';
import { UserModule } from './user/user.module';
import { SubjectModule } from './subject/subject.module';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import { TagModule } from './tag/tag.module';
import { TaskModule } from './task/task.module';
import { ColorThemeModule } from './color-theme/color-theme.module';
import { ColoreThemeService } from './colore-theme/colore-theme.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    UserModule,
    SubjectModule,
    AuthModule,
    TestModule,
    TagModule,
    TaskModule,
    ColorThemeModule,
  ],
  controllers: [],
  providers: [ColoreThemeService],
})
export class AppModule {}
