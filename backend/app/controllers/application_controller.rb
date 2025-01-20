class ApplicationController < ActionController::API
  # devise_token_authから提供されるconcernをインポート
  include DeviseTokenAuth::Concerns::SetUserByToken
  # 権限管理
  include Pundit::Authorization

  #[TODO] 別途CSRF対策を実装する必要あり
end
