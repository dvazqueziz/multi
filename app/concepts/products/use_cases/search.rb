module Products
  module UseCases
    class Search < ApplicationUseCase

      def initialize(validator: ::Products::Validators::Search.new)
        @validator = validator
      end

      def execute(query_params:)
        query_params = yield validate_query_params(query_params)
        products_query = yield search_products(query_params)
        Success(products_query)
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

      def search_products(params)
        query = Product.ransack(params)
        query.sorts = ['created_at desc'] if query.sorts.empty?
        Success(query)
      end

    end
  end
end