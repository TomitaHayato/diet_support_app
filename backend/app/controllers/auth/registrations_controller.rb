# ユーザー作成
class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  private

  def signup_params
    params.permit(:email, :password, :password_confirmation, :name)
  end
end
