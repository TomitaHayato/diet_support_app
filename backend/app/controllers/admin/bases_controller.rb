class Admin::BasesController < ApplicationController
  before_action :limit_admin

  private

  def limit_admin
    render status: 403 unless current_user?.admin?
  end
end
