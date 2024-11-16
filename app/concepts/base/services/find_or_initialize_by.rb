module Base
  module Services
    class FindOrInitializeBy < ApplicationService

      attr_reader :klass, :params

      def initialize(klass:, params:)
        @klass, @params = klass, params.dup
      end

      def execute
        Success(value: @klass.find_or_initialize_by(@params))
      end

    end
  end
end