import { schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    content: schema.string({}, [
      rules.maxLength(255)
    ]),
    mediaUrl: schema.string(),
    mediaType: schema.string(),
    user_id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
