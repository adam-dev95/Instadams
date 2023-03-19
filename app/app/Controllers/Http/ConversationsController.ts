import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
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
        conversationId: number
      }[] = []

      queryParams[params.userId.toString()] = Number(params.userId)
      const data = await Conversation.query().whereJson('participants', queryParams)

      for (let index in data) {
        let conversation = data[index].participants
        console.log(conversation)
        const obj = {
          name: 'Luke Skywalker',
          title: 'Jedi Knight',
          age: 23
        };
        
        // Convert `obj` to a key/value array
        // `[['name', 'Luke Skywalker'], ['title', 'Jedi Knight'], ...]`
        const asArray = Object.entries(obj);
        // for (const key of conversation) {
          // let userId = Object.keys(key)
          // if (userId[0] !== params.userId) {
          //   const userData = await User.findOrFail(userId[0])
          //   let obj = {
          //     userData: {
          //       userId: Number(userId[0]),
          //       userName: userData.name,
          //     },
          //     conversationId: data[index].id,
          //   }
          //   conversations.push(obj)
          // }
        // }
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async store({ request }: HttpContextContract) {
    try {
      let data = request.body()
      console.log(data)
      let stringified: string = JSON.stringify(data)
      let array = []
      array.push(stringified)
      console.log(typeof(stringified))
      await Database.rawQuery(
        "INSERT INTO `conversations`(`participants`) VALUES (?)",
        [[`${array}`]]
      )
      
    } catch (error) {
      console.log(error)
    }
  }
}
