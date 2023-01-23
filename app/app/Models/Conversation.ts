import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public participants: JSON
}
