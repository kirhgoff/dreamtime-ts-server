import {MigrationInterface, QueryRunner} from "typeorm";

export class NewObjectsTable1630822792822 implements MigrationInterface {
    name = 'NewObjectsTable1630822792822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "world_objects" (
                    "id" SERIAL NOT NULL, 
                    "type" character varying NOT NULL, 
                    "lat" double precision NOT NULL, 
                    "long" double precision NOT NULL, 
                    "location" geography(Point,4326), 
                    "data" character varying NOT NULL, 
                    "ownerId" integer, 
                    CONSTRAINT "PK_1de47ec6e8504e28b5213162d5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a52a05196976bc5a5903eb513" ON "world_objects" USING GiST ("location") `);
        await queryRunner.query(`ALTER TABLE "world_objects" ADD CONSTRAINT "FK_026a6fa1ca64e3ee548e7b2f774" FOREIGN KEY ("ownerId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "world_objects" DROP CONSTRAINT "FK_026a6fa1ca64e3ee548e7b2f774"`);
        await queryRunner.query(`DROP INDEX "IDX_2a52a05196976bc5a5903eb513"`);
        await queryRunner.query(`DROP TABLE "world_objects"`);
    }

}
