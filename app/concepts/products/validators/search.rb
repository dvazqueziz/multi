module Products
  module Validators
    class Search < ApplicationValidator

      params do
        optional(:name)
      end

    end

  end
end
