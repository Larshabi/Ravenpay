import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('Accounts', (table)=>{
        table.dropColumn('reference');
        table.dropColumn('bvn')
        table.dropColumn('nin')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('Accounts', (table)=>{
        table.string('reference').notNullable();
        table.string('bvn').notNullable()
        table.string('nin').notNullable()
    })
}

