import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'characters' })
export class Characters {
  @PrimaryGeneratedColumn('increment')
  char_id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  birthday: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  occupation: string[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  img: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  status: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  appearance: string[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  portrayed: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  category: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  better_call_saul_appearance: string[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  episodes: string[];

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: '',
  })
  created_at: Date;

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
