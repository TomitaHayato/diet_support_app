class ContactMailer < ApplicationMailer
  def contact_mail
    @contact = params[:contact]
    @email   = @contact[:email]

    mail(
      to: Rails.application.credentials.dig(:gmail, :user),
      subject: "お問い合わせ [Calorie Work]"
    )
  end
end
