module Base
  module Services
    class Find < ApplicationService

      def execute(klass:, id:)
        begin
          Success(klass.find(id))
        rescue ActiveRecord::RecordNotFound
          Failure(Exceptions::NotFoundError.new(klass))
        end
      end

    end
  end
end


