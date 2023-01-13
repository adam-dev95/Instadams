import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import CommentValidator from 'App/Validators/CommentValidator'

export default class CommentsController {
  public async store({ request, auth }: HttpContextContract) {
    try {
      const validatedData = await request.validate(CommentValidator)
      auth.user?.related('comment').create(validatedData)
    } catch (error) {
      return 'Error while replying to the publication'
    }
  }

  public async delete({ params, auth }: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(params.commentId)
      if (comment && comment.userId === auth.user?.id) {
        comment.delete()
      }
    } catch (error) {
      return 'Error while deleting comment'
    }
  }
}
