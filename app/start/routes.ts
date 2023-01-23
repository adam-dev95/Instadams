import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Authentication
  Route.post('auth/register', 'AuthController.register')
  Route.post('auth/login', 'AuthController.login')

  // Threads
  Route.get('threads', 'ThreadsController.index').middleware('auth')
  Route.get('threads/:id', 'ThreadsController.show')
  Route.post('threads', 'ThreadsController.store').middleware('auth')
  Route.patch('threads/:id', 'ThreadsController.update').middleware('auth')
  Route.delete('threads/:id', 'ThreadsController.delete').middleware('auth')

  // Publications
  Route.post('posts', 'PostsController.store').middleware('auth')
  Route.get('posts/:id', 'PostsController.show').middleware('auth')
  Route.delete('posts/:id', 'PostsController.delete').middleware('auth')

  // Comments
  Route.post('posts/:postId/comments', 'CommentsController.store').middleware('auth')
  Route.delete('posts/:postId/comments/:commentId', 'CommentsController.delete').middleware('auth')

  // Conversation

  Route.get('conversations/:userId', 'ConversationsController.index').middleware('auth')

}).prefix('api')
