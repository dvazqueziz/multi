as :user do
  root to: "devise/sessions#new"
end

devise_for :users,
           path: '',
           path_names: { sign_in: 'login',
                         sign_up: 'singup',
                         sign_out: 'logout',
                         password: 'recover' },
           controllers: { registrations: 'registrations',
                          sessions: 'sessions', }