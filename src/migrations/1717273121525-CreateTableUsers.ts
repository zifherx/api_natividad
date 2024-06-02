import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1717273121525 implements MigrationInterface {
    name = 'CreateTableUsers1717273121525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`firstName\` varchar(30) NOT NULL, \`lastName\` varchar(30) NOT NULL, \`cellphone\` varchar(9) NULL, \`typeDocument\` varchar(255) NOT NULL, \`document\` varchar(15) NOT NULL, \`email\` varchar(50) NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(65) NOT NULL, \`avatar\` varchar(255) NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`isDeleted\` tinyint NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` (\`document\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
