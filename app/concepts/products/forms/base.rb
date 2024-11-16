module Products
  module Forms
    class Base < ApplicationForm
      model :product

      property :name

    end
  end
end