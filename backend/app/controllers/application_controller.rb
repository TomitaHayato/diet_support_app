class ApplicationController < ActionController::API
  # devise_token_authから提供されるconcernをインポート
  include DeviseTokenAuth::Concerns::SetUserByToken

  protect_from_forgery with: :exception
end
