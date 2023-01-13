import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    content: schema.string({}, [
      rules.maxLength(255)
    ]),
    post_id: schema.number([rules.exists({ table: 'posts', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
