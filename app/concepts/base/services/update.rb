module Base
  module Services
    class Update < ApplicationService

      def execute(model:, params:)
        model.update(params)
        Success(model)
      end

    end
  end
end