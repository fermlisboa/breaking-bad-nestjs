import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'characters' })
export class Characters {
  @ApiProperty({
    description: 'Unique Id per character',
    example: 1,
  })
  @PrimaryGeneratedColumn('increment')
  char_id: number;

  @ApiProperty({
    description: "A character's full name",
    example: 'Walter White',
  })
  @Column({
    type: 'varchar',
  })
  name: string;

  @ApiProperty({
    description: "A character's birthday",
    example: '09-07-1958',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  birthday: string;

  @ApiProperty({
    description: "List of character's known occupation",
    example: ['High School Teacher', 'Meth King Pin'],
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  occupation: string[];

  @ApiProperty({
    description: "Character's image",
    example:
      'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  img: string;

  @ApiProperty({
    description: 'Are they alive (or did Heisenberg get to them??)',
    example: 'Presumed dead',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  status: string;

  @ApiProperty({
    description: 'A known nickname they are referred as',
    example: 'Heisenberg',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  nickname: string;

  @ApiProperty({
    description: 'Breaking Bad Season the character appears in',
    example: ['1', '2', '3', '4', '5'],
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  appearance: string[];

  @ApiProperty({
    description: 'The actor / actress that portrayed the character',
    example: 'Bryan Cranston',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  portrayed: string;

  @ApiProperty({
    description: 'Series that the character is involved with',
    example: 'Breaking Bad',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  category: string;

  @ApiProperty({
    description: 'Better Call Saul seasons the character appears in',
    example: ['1', '2'],
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  better_call_saul_appearance: string[];

  @ApiProperty({
    description: 'Episodes the character appears in',
    example: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  episodes: string[];

  @ApiProperty({
    description: "Character's create date time",
    example: '2022-09-08T13:40:44.993Z',
  })
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: '',
  })
  created_at: Date;

  @ApiProperty({
    description: "Character's soft delete date time",
    example: '2022-09-08T13:40:44.993Z',
  })
  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;

  constructor(character?: Partial<Characters>) {
    this.char_id = character?.char_id;
    this.name = character?.name;
    this.birthday = character?.birthday;
    this.occupation = character?.occupation;
    this.img = character?.img;
    this.status = character?.status;
    this.nickname = character?.nickname;
    this.appearance = character?.appearance;
    this.portrayed = character?.portrayed;
    this.category = character?.category;
    this.better_call_saul_appearance = character?.better_call_saul_appearance;
    this.episodes = character?.episodes;
    this.created_at = character?.created_at;
    this.deleted_at = character?.deleted_at;
  }
}
