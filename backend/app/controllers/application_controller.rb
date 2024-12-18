class ApplicationController < ActionController::API
  # devise_token_authから提供されるconcernをインポート
  include DeviseTokenAuth::Concerns::SetUserByToken

  #[TODO] 別途CSRF対策を実装する必要あり
  skip_before_action :verify_authenticity_token
end
