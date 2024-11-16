Rails.application.configure do

  config.action_mailer.delivery_method = Settings.mail.delivery_method
  config.action_mailer.perform_deliveries = true

  # Requerido por Devise
  config.action_mailer.default_url_options = {
    host: Settings.mail.default_url_options.host,
    port: Settings.mail.default_url_options.port
  }

end
