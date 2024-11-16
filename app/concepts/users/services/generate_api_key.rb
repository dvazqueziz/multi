module Users
  module Services
    class GenerateApiKey < ApplicationService

      def execute
        loop do
          api_key = Devise.friendly_token
          return Success(api_key) unless User.exists?(api_key: api_key)
        end
      end

    end
  end
end