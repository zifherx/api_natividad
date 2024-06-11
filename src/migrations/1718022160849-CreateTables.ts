import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1718022160849 implements MigrationInterface {
    name = 'CreateTables1718022160849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Tbl_TypeDocument\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`title\` varchar(50) NOT NULL, \`abbreviation\` varchar(20) NOT NULL, \`length\` decimal NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', \`isDeleted\` tinyint NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Tbl_Roles\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name\` varchar(50) NOT NULL, \`description\` text NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', \`isDeleted\` tinyint NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Tbl_Users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`firstName\` varchar(30) NOT NULL, \`lastName\` varchar(30) NOT NULL, \`cellphone\` varchar(9) NULL, \`document\` varchar(15) NOT NULL, \`email\` varchar(50) NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(65) NOT NULL, \`avatar\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT '1', \`isDeleted\` tinyint NOT NULL DEFAULT '0', \`typeDocumentId\` varchar(36) NULL, \`roleId\` varchar(36) NULL, UNIQUE INDEX \`IDX_a6913ec8c1e1faa9fedc6b4eeb\` (\`document\`), UNIQUE INDEX \`IDX_27367103756b0d8e84407f94f4\` (\`email\`), UNIQUE INDEX \`IDX_a9768445097f20f1205db5ae5d\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Tbl_Users\` ADD CONSTRAINT \`FK_b6f077057daa1a3ea98e649092f\` FOREIGN KEY (\`typeDocumentId\`) REFERENCES \`Tbl_TypeDocument\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Tbl_Users\` ADD CONSTRAINT \`FK_7be2ebad37524cd08167a63a5e5\` FOREIGN KEY (\`roleId\`) REFERENCES \`Tbl_Roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tbl_Users\` DROP FOREIGN KEY \`FK_7be2ebad37524cd08167a63a5e5\``);
        await queryRunner.query(`ALTER TABLE \`Tbl_Users\` DROP FOREIGN KEY \`FK_b6f077057daa1a3ea98e649092f\``);
        await queryRunner.query(`DROP INDEX \`IDX_a9768445097f20f1205db5ae5d\` ON \`Tbl_Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_27367103756b0d8e84407f94f4\` ON \`Tbl_Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6913ec8c1e1faa9fedc6b4eeb\` ON \`Tbl_Users\``);
        await queryRunner.query(`DROP TABLE \`Tbl_Users\``);
        await queryRunner.query(`DROP TABLE \`Tbl_Roles\``);
        await queryRunner.query(`DROP TABLE \`Tbl_TypeDocument\``);
    }

}
