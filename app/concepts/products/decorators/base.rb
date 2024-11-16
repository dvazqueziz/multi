module Products
  module Decorators

    class Base < ApplicationDecorator

      decorates :product

      delegate :name, :category_id, :created_at, :updated_at

    end

  end
end