import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedPasswordAndRole1622362359882 implements MigrationInterface {
    name = 'AddedPasswordAndRole1622362359882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "people" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "role"`);
    }

}
