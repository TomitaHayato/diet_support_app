Rails.application.routes.draw do
  # devise_token_authによる認証用のルーティング
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
    sessions: 'auth/sessions'
  }

  namespace :auth do
    resources :get_sessions, only: %i[index]
  end

  resources :workouts, only: %i[index], shallow: true do
    resources :user_workout_likes, only: %i[create update]
  end

  resources :users, only: %i[update]

  post "workout_records"         => "workout_records#create"
  get  "workout_records"         => "workout_records#index"
  get  "workout_records_yearly"  => "workout_records#index_yearly_data"
  get  "workout_records_monthly" => "workout_records#index_monthly_data"
  get  "workout_records_weekly"  => "workout_records#index_weekly_data"


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
