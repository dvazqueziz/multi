module Users
  module UseCases
    class Search < ApplicationUseCase

      def initialize(validator: ::Users::Validators::Search.new)
        @validator = validator
      end

      def execute(query_params:)
        query_params = yield validate_query_params(query_params)
        users_query = yield search_users(query_params)
        Success(users_query)
      end

      private

      def validate_query_params(params)
        result = @validator.execute(params)
        if result.success?
          Success(result.to_h)
        else
          Failure(result.errors.to_h)
        end
      end

      def search_users(params)
        query = User.ransack(params)
        query.sorts = ['created_at desc'] if query.sorts.empty?
        Success(query)
      end

    end
  end
end