import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LikeValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    post_id: schema.number([rules.exists({ table: 'posts', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
