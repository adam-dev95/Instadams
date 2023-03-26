import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like'
import Post from 'App/Models/Post'
import LikeValidator from 'App/Validators/LikeValidator'

export default class LikesController {
  public async store({ request, auth, response }: HttpContextContract) {
    try {
      const { user } = auth
      const userId = user?.id
      const { post_id } = request.body()
      const isLiked = await Like.query().where('post_id', post_id).where('user_id', userId).first()
      if (isLiked) {
        return response.status(400).json({ message: `Déja liker` })
      }

      const validatedData = await request.validate(LikeValidator)
      user?.related('like').create(validatedData)
      return response.status(200).json({ message: `Publication aimer avec succès.` })
    } catch (error) {
      console.log(error)
    }
  }

  public async delete({ params, auth, response }: HttpContextContract) {
    try {
      const { postId } = params
      const { user } = auth
      const userId = user?.id

      const post = await Post.find(postId)
      if (!post) {
        return response.status(404).json({ message: `La publication n'existe pas.` })
      }
      const isLiked = await Like.query().where('post_id', postId).where('user_id', userId).first()
      if (!isLiked) {
        return response.status(400).json({ message: `L'utilisateur n'a pas liker la publication` })
      }

      await Like.query().where('post_id', postId).where('user_id', userId).delete()
      return response.status(200).json({ message: `Publication disliek avec succès.` })
    } catch (error) {
      console.log(error)
    }
  }
}
