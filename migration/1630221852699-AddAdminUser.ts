import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdminUser1630221852699 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO people (email, full_name, password, role) VALUES ('kirill.lastovirya@gmail.com', 'kirhgoff', 'ezhik', 'admin')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(
            `DELETE FROM people \
             WHERE email='kirill.lastovirya@gmail.com' \
             AND fullName='kirhgoff' \
             AND role='admin'`);
    }
}

// INSERT INTO user(email, fullName, role) VALUES('kirill.lastovirya@gmail.com', 'kirhgoff', 'admin')