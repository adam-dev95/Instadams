import { schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    content: schema.string({}, [
      rules.maxLength(255)
    ]),
    url: schema.string(),
    type: schema.string()
  })

  public messages: CustomMessages = {}
}
