import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ThreadValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    title: schema.string.optional({}, [
      rules.maxLength(255),
      rules.unique({ table: 'threads', column: 'title ' }),
    ]),
    content: schema.string.optional(),
    category_id: schema.number.optional([rules.exists({ table: 'categories', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
