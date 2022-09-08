import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1662648361123 implements MigrationInterface {
  name = 'initial1662648361123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "characters" ("char_id" SERIAL NOT NULL, "name" character varying NOT NULL, "birthday" character varying, "occupation" text, "img" character varying, "status" character varying, "nickname" text, "appearance" character varying, "portrayed" character varying, "category" character varying, "better_call_saul_appearance" character varying, "episodes" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_78d679ad0775e5f2aa4cd18fb5e" PRIMARY KEY ("char_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "characters"`);
  }
}
