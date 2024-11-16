class ApplicationController < ActionController::Base
  include Pundit::Authorization

  layout :layout_by_resource

  def after_sign_in_path_for(resource)
    if resource.has_role? :admin
      admin_root_path
    else
      user_root_path
    end
  end

  protected

  def layout_by_resource
    if devise_controller?
      'devise/application'
    end
  end

end
