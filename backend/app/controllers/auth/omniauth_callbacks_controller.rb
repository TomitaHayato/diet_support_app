class Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

  protected

  def omniauth_window_type
    # p "paramsの値"
    # p params['omniauth_window_type'] if Rails.env.development?
    
    # p "omniauth_paramsの値"
    # p omniauth_params['omniauth_window_type'] if Rails.env.development?
    
    omniauth_params.nil? ? params['omniauth_window_type'] : omniauth_params['omniauth_window_type']
  end

  def render_data(message, data)
    @data = data.merge(message: ActionController::Base.helpers.sanitize(message))
    # p @data if Rails.env.development?
    render layout: nil, template: 'devise_token_auth/omniauth_external_window'
  end
end
