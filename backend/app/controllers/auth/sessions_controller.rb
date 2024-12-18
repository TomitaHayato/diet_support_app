class Auth::SessionsController < DeviseTokenAuth::SessionsController
  # パラメータの自動ラップを無効
  wrap_parameters format: []
end
