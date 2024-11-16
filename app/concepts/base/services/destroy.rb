module Base
  module Services
    class Destroy < ApplicationService

      attr_reader :model

      def initialize(model:)
        @model = model
      end

      def execute
        @model.destroy
        Success(true)
      end

    end
  end
end