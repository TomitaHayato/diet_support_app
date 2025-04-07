class ContactMailer < ApplicationMailer
  def contact_mail
    @contact = params[:contact]
    @email   = @contact.email || false

    mail(
      to: Rails.application.credentials.email_for_contact,
      subject: "お問い合わせ"
    )
  end
end
