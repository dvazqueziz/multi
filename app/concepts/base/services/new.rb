module Base
  module Services
    class New < ApplicationService

      attr_reader :klass, :params

      def initialize(klass:, params:)
        @klass, @params = klass, params.dup
      end

      def execute
        model = @klass.new(@params)
        Success(model)
      end

    end
  end
end