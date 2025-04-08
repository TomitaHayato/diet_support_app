class ContactMailer < ApplicationMailer
  def contact_mail
    @contact = params[:contact]
    @email   = @contact[:email]

    mail(
      to: Rails.application.credentials.email_for_contact,
      subject: "お問い合わせ"
    )
  end
end

# TODO
  # Gmailと連携
