module Users
  module Services
    class GetDefaultLocale < ApplicationService

      def execute
        Success(Settings.locale.default)
      end

    end
  end
end