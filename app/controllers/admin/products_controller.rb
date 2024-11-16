module Admin
    class ProductsController < ::Admin::BaseController
      def index
        authorize User
        result = ::Products::UseCases::Search.execute(query_params: params[:query])

        if result.success?
            @query = result.value!
            @pagy, products = pagy(@query.result)
            @products = ::Users::Decorators::Base.decorate_collection(products)
          else
            flash[:error] = _('Ha ocurrido un error')
            redirect_to admin_users_path
          end
      end
    end
end