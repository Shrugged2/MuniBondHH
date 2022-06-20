import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Notification', (table) => {
    table.uuid('id').primary()
    table.text('error').nullable()
    table.text('status').notNullable()
    table.text('type').notNullable()
    table
      .uuid('userAccountId')
      .references('id')
      .inTable('UserAccount')
      .notNullable()
    table.json('variables').nullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Notification')
}
