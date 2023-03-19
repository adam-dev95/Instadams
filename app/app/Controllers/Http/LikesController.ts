import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LikesController {
    public async store({request}) {
        console.log(request.body())
    }
}