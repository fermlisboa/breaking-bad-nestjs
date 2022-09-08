import { ApiProperty } from '@nestjs/swagger';

export class CharacterCreateType {
  @ApiProperty({
    description: "Character's name",
    example: 'Walter White',
  })
  name: string;
}
