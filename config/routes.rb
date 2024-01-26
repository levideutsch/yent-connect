Rails.application.routes.draw do
  resources :profiles
  resources :relationships
  resources :likes
  resources :messages
  resources :conversations
  resources :comments
  resources :posts
  resources :user_settings
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "all-users-posts", to: "posts#all_users_posts"

  get "/all-users", to: "users#all_users"
  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  patch "/toggle-theme", to: "user_settings#toggle_theme"
  get "/mode", to: "user_settings#md"

  get "/latest", to: "posts#latest"

  post "/create-conversation/:user", to: "conversations#create_conversation"
  get '/conversations/:id/show', to: 'conversations#show'

  # post '/messages/create_for_conversation/:conversation_id', to: 'messages#create_for_conversation'
  post '/new-message/:chatId/:userId', to: "messages#create_message"
  get "/all-messages", to: "messages#all_messages"

  get "/first-like", to: "likes#first_like"
  get "all-likes", to: "likes#display_likes_for_post"

  post "like-post/:postId", to: "likes#like_post"
  delete 'unlike-post/:postId', to: 'likes#unlike_post'
  get 'all-likes-for-post/:post_id', to: 'likes#all_likes_for_post'

  get "max-likes", to: "likes#max_likes"

  get "current-users-relationships", to: "relationships#current_user_relationships"
  post "follow-user/:userId", to: "relationships#follow_user"
  delete "unfollow-user/:userId", to: "relationships#unfollow_user"

  get "relationship-by-id/:userId", to: "relationships#relationship_by_id"

  get "all-users-with-profiles", to: "users#all_users_with_profiles"
  patch "edit-profile", to: "profiles#edit_profile"
end
