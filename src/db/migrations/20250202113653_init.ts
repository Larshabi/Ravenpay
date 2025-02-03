import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Users", function (table) {
    table.increments("id");
    table.uuid("Guid").defaultTo(knex.raw("(UUID())"));
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255).notNullable();
    table.string('phoneNumber', 225).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.boolean("isVerified").defaultTo(true);
    table.timestamps(true, true);
  });

 await knex.schema.createTable("Accounts", function (table) {
    table.increments("id");
    table.uuid("Guid").defaultTo(knex.raw("(UUID())"));
    table.string("accountNumber", 255).notNullable();
    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE");
    table.string("bvn", 255).notNullable();
    table.string("nin", 255).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
