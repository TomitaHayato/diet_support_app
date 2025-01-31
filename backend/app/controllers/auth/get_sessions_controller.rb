# ログインユーザーの管理
class Auth::GetSessionsController < ApplicationController
  def index
    login_data = current_user ? current_user : false

    render json: login_data
  end
end
