Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer if Rails.env.development?
  provider :google_oauth2 , Rails.application.credentials.google[:client_id], Rails.application.credentials.google[:client_secret]
  OmniAuth.config.allowed_request_methods = %i[post get]
end
