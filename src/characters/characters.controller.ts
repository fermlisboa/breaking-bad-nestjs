import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { sortCharacters } from 'src/utils/format';
import { DeleteResult } from 'typeorm';

import { Characters } from './characters.entity';
import { CharactersService } from './characters.service';
import { ICharacterCreateType } from './dto/charactersCreateType';

@ApiTags('Character')
@Controller('characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @ApiResponse({ status: HttpStatus.OK, type: Characters })
  @Get(':name')
  async findCharacter(@Param('name') name: string): Promise<string | Characters> {
    const character = await this.characterService.findByName(name);
    if (Object.keys(character).length === 0) {
      return `We don't have any ${name} in this show`;
    }
    if (Object.keys(character).length > 1) {
      return `We have more than one ${name}, please be more precise`;
    }
    return character;
  }

  @ApiResponse({ status: HttpStatus.OK, type: Characters })
  @Get()
  async findAll(): Promise<Characters[]> {
    const characters = await this.characterService.find();
    const sortedCharacters = sortCharacters(characters);
    return sortedCharacters;
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: Characters })
  @Post()
  async create(@Body() char: ICharacterCreateType): Promise<string | Characters> {
    const character = await this.characterService.findByName(char.name);
    if (Object.keys(character).length === 0) {
      return `We don't have any ${char.name} in this show`;
    }
    if (Object.keys(character).length > 1) {
      return `We have more than one ${char.name}, please be more precise`;
    }
    character[0].episodes = await this.characterService.findEpisodeWithCharacter(
      char.name
    );
    return this.characterService.create(character).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        Number(err.response.status)
      );
    });
  }

  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Delete(':char_id')
  async remove(@Param('char_id') char_id: string): Promise<DeleteResult> {
    return this.characterService.remove(char_id);
  }

  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Delete('delete/:char_id')
  async hardDelete(@Param('char_id') char_id: string): Promise<DeleteResult> {
    return this.characterService.hardDelete(char_id);
  }
}
