import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'conversations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.json('participants').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
