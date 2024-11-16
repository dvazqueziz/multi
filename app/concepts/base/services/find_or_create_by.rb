module Base
  module Services
    class FindOrCreateBy < ApplicationService

      attr_reader :klass, :params

      def initialize(klass:, params:)
        @klass, @params = klass, params.dup
      end

      def execute
        Success(@klass.find_or_create_by(@params))
      end

    end
  end
end