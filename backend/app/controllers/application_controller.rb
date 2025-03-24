class ApplicationController < ActionController::Base
  # devise_token_authから提供されるconcernをインポート
  include DeviseTokenAuth::Concerns::SetUserByToken
  # CSRF Token検証に必要
  # include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception
end
