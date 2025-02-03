import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('Accounts', (table)=>{
        table.string('reference').notNullable()
        table.string('accountName').notNullable()
        table.string('bankName').notNullable()
        table.string('amount').notNullable()
    })

    await knex.schema.createTable('Transactions', (table)=>{
        table.increments('id')
        table.string('trx_ref').notNullable()
        table.string('merchant_ref').notNullable()
        table.integer('amount').notNullable()
        table.integer('fee').notNullable()
        table.string('status').notNullable()
        table.string('narration').notNullable()
        table
            .integer("userId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("Users")
            .onDelete("CASCADE");
        table.string('accountName').notNullable()
        table.string('accountNumber').notNullable()
        table.string('bank').notNullable()
        table.string('bankCode').notNullable()
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Transactions').alterTable('Accounts', (table)=>{
        table.dropColumn('reference')
        table.dropColumn('accountName')
        table.dropColumn('bankName')
        table.dropColumn('amount')
    })
}

