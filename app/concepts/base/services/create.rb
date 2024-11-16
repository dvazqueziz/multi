module Base
  module Services
    class Create < ApplicationService

      attr_reader :klass, :params

      def initialize(klass:, params:)
        @klass, @params = klass, params.dup
      end

      def execute
        model = @klass.new(@params)
        model.save
        Success(model)
      end

    end
  end
end
