import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('auth/register', 'AuthController.register')
  Route.post('auth/login', 'AuthController.login')
  Route.get('threads', 'ThreadsController.index').middleware('auth')
  Route.get('threads/:id', 'ThreadsController.show')
  Route.post('threads', 'ThreadsController.store').middleware('auth')
  Route.patch('threads/:id', 'ThreadsController.update').middleware('auth')
  Route.delete('threads/:id', 'ThreadsController.delete').middleware('auth')
  Route.post('posts', 'PostsController.store').middleware('auth')
  Route.get('posts/:id', 'PostsController.show').middleware('auth')
}).prefix('api')
