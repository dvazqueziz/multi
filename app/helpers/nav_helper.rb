module NavHelper

  def nav_link_class(controller, default_class = 'nav-link')
    class_name = default_class
    class_name += " active" if controller_name == controller
    class_name
  end
end