import { Characters } from 'src/characters/characters.entity';

export const sortCharacters = (characters: Characters[]): Characters[] => {
  return characters.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
};
