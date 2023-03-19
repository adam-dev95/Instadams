import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Authentication
  Route.post('auth/register', 'AuthController.register')
  Route.post('auth/login', 'AuthController.login')

  // Publications
  Route.post('posts', 'PostsController.store').middleware('auth')
  Route.get('posts/:id', 'PostsController.show').middleware('auth')
  Route.delete('posts/:id', 'PostsController.delete').middleware('auth')

  // Comments
  Route.post('posts/:postId/comments', 'CommentsController.store').middleware('auth')
  Route.delete('posts/:postId/comments/:commentId', 'CommentsController.delete').middleware('auth')

  // Conversation

  Route.get('conversations/:userId', 'ConversationsController.index').middleware('auth')
  Route.post('conversations', 'ConversationsController.store').middleware('auth')


}).prefix('api')
