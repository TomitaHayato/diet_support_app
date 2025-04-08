class ContactsController < ApplicationController
  def create
    if validation(@contact_params)
      ContactMailer.with(contact: @contact).contact_mail.deliver_now
      render status: 200
      return
    else
      render status: 422
      return
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
