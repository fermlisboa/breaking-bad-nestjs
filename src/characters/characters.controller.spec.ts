import { Test, TestingModule } from '@nestjs/testing';

import { CharactersController } from './characters.controller';
import { Characters } from './characters.entity';
import { CharactersService } from './characters.service';
import { CharacterCreateType } from './dto/charactersCreateSwagger';

const findCharacter: Characters[] = [
  new Characters({
    char_id: 1,
    name: 'Walter White',
    birthday: '09/01/1996',
    occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
    img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
    status: 'Presumed dead',
    nickname: 'Heinsenberg',
    appearance: ['1,2,3,4,5'],
    portrayed: 'Bryan Cranston',
    category: 'Breaking Bad',
    better_call_saul_appearance: [],
  }),
];

const completeCharacter: Characters[] = [
  new Characters({
    char_id: 1,
    name: 'Walter White',
    birthday: '09/01/1996',
    occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
    img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
    status: 'Presumed dead',
    nickname: 'Heinsenberg',
    appearance: ['1,2,3,4,5'],
    portrayed: 'Bryan Cranston',
    category: 'Breaking Bad',
    better_call_saul_appearance: [],
    episodes: ['1,2,3,4,5,6,7,8,9,10'],
  }),
];

const characterList: Characters[] = [
  new Characters({
    char_id: 1,
    name: 'Walter White',
    birthday: '09-07-1958',
    occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
    img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
    status: 'Presumed dead',
    nickname: 'Heinsenberg',
    appearance: ['1,2,3,4,5'],
    portrayed: 'Bryan Cranston',
    category: 'Breaking Bad',
    better_call_saul_appearance: [],
    episodes: ['1,2,3,4,5,6,7,8,9,10'],
  }),
  new Characters({
    char_id: 2,
    name: 'Jesse Pinkman',
    birthday: '09-24-1984',
    occupation: ['Meth Dealer'],
    img: 'https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441',
    status: 'Alive',
    nickname: "Cap n' Cook",
    appearance: ['1,2,3,4,5'],
    portrayed: 'Aaron Paul',
    category: 'Breaking characterListBad',
    better_call_saul_appearance: [],
    episodes: ['1,2,3,4,5,6,7,8,9,10'],
  }),
];

const episodeList = ['1,2,3,4,5,6,7,8,9,10'];

const softDeleteResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

const hardDeleteResult = {
  raw: [],
  affected: 1,
};

describe('CharactersController', () => {
  let charactersController: CharactersController;
  let charactersService: CharactersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        {
          provide: CharactersService,
          useValue: {
            findByName: jest.fn().mockResolvedValue(findCharacter),
            findEpisodeWithCharacter: jest.fn().mockResolvedValue(episodeList),
            find: jest.fn().mockResolvedValue(characterList),
            create: jest.fn().mockResolvedValue(completeCharacter),
            remove: jest.fn().mockResolvedValue(softDeleteResult),
            hardDelete: jest.fn().mockResolvedValue(hardDeleteResult),
          },
        },
      ],
    }).compile();

    charactersController = app.get<CharactersController>(CharactersController);
    charactersService = app.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(charactersController).toBeDefined();
    expect(charactersService).toBeDefined();
  });

  describe('findCharacter', () => {
    it('should return a character by their name', async () => {
      // Arrange
      // Act
      const result = await charactersController.findCharacter('Walter White');
      // Assert
      expect(result).toEqual(findCharacter);
      expect(typeof result).toEqual('object');
      expect(charactersService.findByName).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', async () => {
      // Arrange
      jest.spyOn(charactersService, 'findByName').mockRejectedValueOnce(new Error());
      // Act
      // Assert
      expect(charactersController.findCharacter('Walterr')).rejects.toThrowError();
    });
  });
  describe('findAll', () => {
    it('should return a list of characters', async () => {
      // Arrange
      // Act
      const result = await charactersController.findAll();
      // Assert
      expect(result).toEqual(characterList);
      expect(typeof result).toEqual('object');
      expect(charactersService.find).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', async () => {
      // Arrange
      jest.spyOn(charactersService, 'find').mockRejectedValueOnce(new Error());
      // Act
      // Assert
      expect(charactersController.findAll()).rejects.toThrowError();
    });
  });
  describe('create', () => {
    it('should create a new character', async () => {
      // Arrange
      const char: CharacterCreateType = {
        name: 'Walter White',
      };
      // Act
      const result = await charactersController.create(char);
      // Assert
      expect(result).toEqual(completeCharacter);
      expect(typeof result).toEqual('object');
      expect(charactersService.create).toHaveBeenCalledWith(completeCharacter);
      expect(charactersService.create).toHaveBeenCalledTimes(1);
      expect(charactersService.findByName).toHaveBeenCalledTimes(1);
      expect(charactersService.findByName).toHaveBeenCalledWith('Walter White');
      expect(charactersService.findEpisodeWithCharacter).toHaveBeenCalledTimes(1);
      expect(charactersService.findEpisodeWithCharacter).toHaveBeenCalledWith(
        'Walter White'
      );
    });
    it('should throw an exception', async () => {
      // Arrange
      const char: CharacterCreateType = {
        name: 'Walter White',
      };
      jest.spyOn(charactersService, 'create').mockRejectedValueOnce(new Error());
      // Act
      // Assert
      expect(charactersController.create(char)).rejects.toThrowError();
    });
  });
  describe('create', () => {
    it('should create a new character', async () => {
      // Arrange
      const char: CharacterCreateType = {
        name: 'Walter White',
      };
      // Act
      const result = await charactersController.create(char);
      // Assert
      expect(result).toEqual(completeCharacter);
      expect(typeof result).toEqual('object');
      expect(charactersService.create).toHaveBeenCalledWith(completeCharacter);
      expect(charactersService.create).toHaveBeenCalledTimes(1);
      expect(charactersService.findByName).toHaveBeenCalledTimes(1);
      expect(charactersService.findByName).toHaveBeenCalledWith('Walter White');
      expect(charactersService.findEpisodeWithCharacter).toHaveBeenCalledTimes(1);
      expect(charactersService.findEpisodeWithCharacter).toHaveBeenCalledWith(
        'Walter White'
      );
    });
    it('should throw an exception', async () => {
      // Arrange
      const char: CharacterCreateType = {
        name: 'Walter White',
      };
      jest.spyOn(charactersService, 'create').mockRejectedValueOnce(new Error());
      // Act
      // Assert
      expect(charactersController.create(char)).rejects.toThrowError();
    });
  });
  describe('remove', () => {
    it('should remove a character successfully', async () => {
      // Arrange
      // Act
      const result = await charactersController.remove('1');
      // Assert
      expect(result).toEqual(softDeleteResult);
      expect(charactersService.remove).toHaveBeenCalledWith('1');
      expect(charactersService.remove).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', async () => {
      // Arrange
      jest.spyOn(charactersService, 'remove').mockRejectedValueOnce(new Error());
      // Act
      // Assert
      expect(charactersController.remove('1')).rejects.toThrowError();
    });
  });
  describe('hardDelete', () => {
    it('should delete a character successfully from database', async () => {
      // Arrange
      // Act
      const result = await charactersController.hardDelete('1');
      // Assert
      expect(result).toEqual(hardDeleteResult);
      expect(charactersService.hardDelete).toHaveBeenCalledWith('1');
      expect(charactersService.hardDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', async () => {
      // Arrange
      jest.spyOn(charactersService, 'hardDelete').mockRejectedValueOnce(new Error());
      // Act
      // Assert
      expect(charactersController.hardDelete('1')).rejects.toThrowError();
    });
  });
});
