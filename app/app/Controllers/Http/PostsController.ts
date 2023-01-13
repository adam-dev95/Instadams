import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async store({ request, auth }: HttpContextContract) {
    try {
      const data = await request.validate(PostValidator)
      auth.user?.related('posts').create({
        "content": "testcontent",
        "mediaUrl": "urrrl",
        "mediaType": "photo"
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ request }: HttpContextContract) {
    console.log('ok')
  }
}
