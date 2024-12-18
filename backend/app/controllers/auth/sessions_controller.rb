# ログインユーザーの管理
class Auth::SessionsController < ApplicationController
  def index
    login_data = current_user ? { is_login: true, data: current_user } : { is_login: false, message: "ユーザーは存在しません" }
    
    render json: login_data
  end
end
