OmniAuth.config.allowed_request_methods = [:post, :get]
OmniAuth.config.silence_get_warning = true

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :google_oauth2 ,
    Rails.application.credentials.google[:client_id],
    Rails.application.credentials.google[:client_secret]
end
