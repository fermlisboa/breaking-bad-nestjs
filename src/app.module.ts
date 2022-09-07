import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharactersModule } from './characters/character.module';
import { configService } from './config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), CharactersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
