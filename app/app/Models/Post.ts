import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User';
import Like from './Like';
import Comment from './Comment';


export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string;

  @column()
  public userId: number

  @column()
  public url: string;

  @column()
  public type: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Like)
  public like: HasMany<typeof Like>

  @hasMany(() => Comment)
  public comment: HasMany<typeof Comment>
}
