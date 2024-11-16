namespace :admin do

  root to: "dashboard#index", as: :root

  resources :users
  resources :products

  get 'profile', action: :profile, controller: 'users'

end