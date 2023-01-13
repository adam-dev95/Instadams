import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thread from 'App/Models/Thread'
import ThreadValidator from 'App/Validators/ThreadValidator'
import UpdateThreadValidator from 'App/Validators/UpdateThreadValidator'

export default class ThreadsController {
  public async index() {
    try {
      const threads = await Thread.query().preload('user').preload('category')
      return threads
    } catch (error) {
      return "La ressource demandée n'existe pas"
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const validatedData = await request.validate(ThreadValidator)

    const thread = await auth.user?.related('threads').create(validatedData)

    await thread?.load('user')
    await thread?.load('category')
    return thread
  }

  public async show({ params }: HttpContextContract) {
    try {
      const thread = await Thread.query()
        .where('id', params.id)
        .preload('category')
        .preload('user')
        .firstOrFail()

      return thread
    } catch (error) {
      return "La ressource demandée n'existe pas"
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const thread = await Thread.findOrFail(params.id)
    const validatedData = await request.validate(UpdateThreadValidator)
    thread.merge(validatedData)

    await thread?.load('category')
    await thread?.load('user')

    await thread.save()
    return thread
  }

  public async delete({ request, params }: HttpContextContract) {

    try {
      const thread = await Thread.findOrFail(params.id)

      const deleteThread = await Thread.query().where('id', params.id).delete()
      

    } catch (error) {
      return "error"
    }

  }
}
