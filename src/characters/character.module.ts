import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharactersController } from './characters.controller';
import { Characters } from './characters.entity';
import { CharactersService } from './characters.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Characters])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
