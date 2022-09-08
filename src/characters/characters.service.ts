import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'src/utils/axios';
import { DeleteResult, Repository } from 'typeorm';

import { Characters } from './characters.entity';
import { IEpisodes } from './dto/episodeType';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Characters)
    private repository: Repository<Characters>
  ) {}

  async findByName(name: string): Promise<Characters> {
    const characterUri = `/characters?name=${name}`;
    const { data } = await axios.get(characterUri);
    return data;
  }

  find(): Promise<Characters[]> {
    return this.repository.find();
  }

  findOne(name: string): Promise<Characters> {
    return this.repository.findOne({ where: { name } });
  }

  create(character: Characters): Promise<Characters> {
    return this.repository.save(character);
  }

  remove(character: string): Promise<DeleteResult> {
    return this.repository.softDelete(character);
  }

  hardDelete(character: string): Promise<DeleteResult> {
    return this.repository.delete(character);
  }

  async findAllEpisodes(): Promise<IEpisodes[]> {
    const { data } = await axios.get('/episodes');
    return data;
  }

  async findEpisodeWithCharacter(name: string): Promise<string[]> {
    const episodesList = await this.findAllEpisodes();
    const characterEpisodes = this.listEpisodesWithCharacter(episodesList, name);
    return characterEpisodes;
  }

  listEpisodesWithCharacter(episodesList: IEpisodes[], name: string): string[] {
    const newEpisodesList = episodesList.map(({ episode_id, characters }) => ({
      episode_id,
      characters,
    }));

    const episodesListWithCharacter = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const episode of newEpisodesList) {
      if (episode.characters.includes(name)) {
        episodesListWithCharacter.push(episode.episode_id);
      }
    }

    return episodesListWithCharacter;
  }
}
