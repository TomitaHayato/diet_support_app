Rails.application.routes.draw do
  # devise_token_authによる認証用のルーティング
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
    sessions: 'auth/sessions'
  }

  namespace :auth do
    resources :get_sessions, only: %i[index]
  end

  resources :work_outs, only: %i[index]
  resources :users    , only: %i[update]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
