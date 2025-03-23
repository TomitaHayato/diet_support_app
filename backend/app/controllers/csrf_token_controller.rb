class CsrfTokenController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: { csrf_token: form_authenticity_token }
  end
end
