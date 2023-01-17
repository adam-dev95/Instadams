import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async store({ request, auth }: HttpContextContract) {
    try {
      const validatedData = await request.validate(PostValidator)
      auth.user?.related('posts').create(validatedData)
    } catch (error) {
      return 'Error while create the publication'
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const post = await Post.query()
        .where('id', params.id)
        .preload('user')
        .preload('comment')
        .preload('like')
      return post
    } catch (error) {
      return 'Error while retrieving the publication'
    }
  }

  public async delete({ params, auth }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      if (post && post.userId === auth.user?.id) {
        await post.delete()
        return 'The publication was succesfully deleted'
      } else {
        return 'Error while deleting the publication'
      }
    } catch (error) {
      return 'Error while deleting the publication'
    }
  }
}
