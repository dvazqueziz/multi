
Rails.application.config.reform.validations = :dry

Dry::Validation::Contract.config.messages.load_paths << 'config/locales/es.yml'
Dry::Validation::Contract.config.messages.load_paths << 'config/locales/en.yml'
Dry::Validation::Contract.config.messages.default_locale = I18n.locale
Dry::Schema.config.messages.load_paths << 'config/locales/es.yml'
Dry::Schema.config.messages.load_paths << 'config/locales/en.yml'
Dry::Schema.config.messages.default_locale = I18n.locale
