class UsersController < ApplicationController
  before_action :authenticate_user! # 未認証ユーザーにstatus: :401を返す

  def update
    head 422 if current_user.id != user_params[:id].to_i

    content = nil
    status  = nil

    if current_user.update(user_params)    
      content = current_user
      status  = 200
    else
      content = { errors: current_user.errors }
      status  = 422
    end

    render json: content, status: status
  end

  private

  def user_params
    params.require(:user).permit(:id, :name, :email, :weight)
  end
end
