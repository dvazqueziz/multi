# frozen_string_literal: true

class BreadcrumbComponent < ApplicationComponent

  def initialize(title: nil, separator: false, breadcrumb_items: [])
    @title = title
    @separator = separator
    @breadcrumb_items = breadcrumb_items
  end

end
