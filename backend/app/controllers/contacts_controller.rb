class ContactsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    if validation(contact_params)
      ContactMailer.with(contact: contact_params).contact_mail.deliver_now
      head 200
    else
      head 422
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :subject, :body, :email)
  end

  def validation(params)
    params[:name] && params[:subject] && params[:body]
  end
end
