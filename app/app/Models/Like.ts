import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'


export default class Like extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public userId: number

  @column()
  public postId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>
}
