module Admin
    class CategoriesController < ::Admin::BaseController
      def index
        authorize User
      end
    end
end