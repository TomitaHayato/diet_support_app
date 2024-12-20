class UsersController < ApplicationController
  before_action :authenticate_user! # 未認証ユーザーにstatus: :401を返す

  def update
    if current_user.update(user_params)
      login_data = { is_login: true, data: current_user }      
      render json: login_data, status: 200
    else
      render json: { errors: current_user.errors }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :weight)
  end
end
