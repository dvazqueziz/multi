module Admin
  class DashboardController < ::Admin::BaseController

    before_action :add_index_breadcrumb

    def index
      authorize User
    end

    private

    def add_index_breadcrumb
      add_breadcrumb(title: _('Dashboard'))
    end

  end
end
