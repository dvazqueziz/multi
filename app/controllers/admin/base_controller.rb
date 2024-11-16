module Admin
  class BaseController < ApplicationController
    include Pagy::Backend

    after_action :verify_authorized
    before_action :set_breadcrumbs

    def set_breadcrumbs
      @breadcrumbs = []
    end

    def add_breadcrumb(title:, path: nil, current: false)
      @breadcrumbs << {
        title: title,
        path: path,
        current: current
      }
    end

    protected

    def layout_by_resource
      'admin/application'
    end
  end
end