import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1721653293308 implements MigrationInterface {
    name = 'InitTable1721653293308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying, "photo" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "serialNumber" integer NOT NULL, "isNew" integer NOT NULL, "photo" character varying NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "specification" character varying NOT NULL, "guarantee" character varying NOT NULL, "price" character varying NOT NULL, "order" integer NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "date" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_orders_order" ("productId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_480da59fc3dc476f97e1aaf4c08" PRIMARY KEY ("productId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_921cd7026e41c61055fc829117" ON "product_orders_order" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_088b8ad012588d0aada35b35b9" ON "product_orders_order" ("orderId") `);
        await queryRunner.query(`CREATE TABLE "order_products_product" ("orderId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c" PRIMARY KEY ("orderId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f9ea0b0e59e0d98ade4f2d5e9" ON "order_products_product" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d6c66c08b9c7e84a1b657797df" ON "order_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product_orders_order" ADD CONSTRAINT "FK_921cd7026e41c61055fc8291174" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_orders_order" ADD CONSTRAINT "FK_088b8ad012588d0aada35b35b99" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff"`);
        await queryRunner.query(`ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99"`);
        await queryRunner.query(`ALTER TABLE "product_orders_order" DROP CONSTRAINT "FK_088b8ad012588d0aada35b35b99"`);
        await queryRunner.query(`ALTER TABLE "product_orders_order" DROP CONSTRAINT "FK_921cd7026e41c61055fc8291174"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d6c66c08b9c7e84a1b657797df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f9ea0b0e59e0d98ade4f2d5e9"`);
        await queryRunner.query(`DROP TABLE "order_products_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_088b8ad012588d0aada35b35b9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_921cd7026e41c61055fc829117"`);
        await queryRunner.query(`DROP TABLE "product_orders_order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
