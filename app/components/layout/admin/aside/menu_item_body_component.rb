# frozen_string_literal: true

class Layout::Admin::Aside::MenuItemBodyComponent < ApplicationComponent

  def initialize(title:, icon: nil, font_icon: nil, has_bullet: nil)
    @title = title
    @icon = icon
    @font_icon = font_icon
    @has_bullet = has_bullet
  end

end
