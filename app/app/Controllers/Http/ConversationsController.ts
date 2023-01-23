import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversation from 'App/Models/Conversation'
import User from 'App/Models/User'

export default class ConversationsController {
  public async index({ params }: HttpContextContract) {
    try {
      let queryParams = {}
      let conversations: {
        userData: {
          userId: number
          userName: string
        }
        chatId: number
      }[] = []

      queryParams[params.userId.toString()] = Number(params.userId)
      const data = await Conversation.query().whereJson('participants', queryParams)

      for (let index in data) {
        let conversation = data[index].participants
        for (const key of conversation) {
          let userId = Object.keys(key)
          if (userId[0] !== params.userId) {
            const userData = await User.findOrFail(userId[0])
            let obj = {
              userData: {
                userId: Number(userId[0]),
                userName: userData.name,
              },
              chatId: data[index].id,
            }
            conversations.push(obj)
          }
        }
      }
      console.log(conversations)
    } catch (error) {
      console.log(error)
    }
  }
}
