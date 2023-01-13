import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async store({ request, auth }: HttpContextContract) {
    try {
      const validatedData = await request.validate(PostValidator)
      auth.user?.related('posts').create(validatedData)
    } catch (error) {
      console.log(error.messages)
    }
  }

  public async show({ params, auth }: HttpContextContract) {
    try {
      const post = await Post.query()
      .where('id', params.id)
      .preload('user')
      .firstOrFail()
      console.log(auth.user?.id)
      return post
    } catch (error) {
      console.log(error)
    }
  }
}
