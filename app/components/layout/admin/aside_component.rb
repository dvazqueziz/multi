# frozen_string_literal: true

class Layout::Admin::AsideComponent < Component
  # @example Default
  # <% aside.menu_item(to: path, title: _('Item 1'), font_icon: 'bi bi-speedometer2') %>
  # <% aside.menu_item(to: path, title: _('Item 2'), font_icon: 'bi bi-people') %>
  #
  # <% aside.menu_item(title: _('Item Group 1'), font_icon: 'bi bi-people') do |menu_item| %>
  #   <% menu_item.sub_item(title: 'Sub Item 1', font_icon: 'bi bi-people') %>
  #   <% menu_item.sub_item(title: 'Sub Item 2', font_icon: 'bi bi-people') %>
  #   <% menu_item.sub_item(title: 'Sub Item Group', font_icon: 'bi bi-people') do |sub_item| %>
  #     <% sub_item.sub_item(title: 'Sub Item 1', font_icon: 'bi bi-people') %>
  #     <% sub_item.sub_item(title: 'Sub Item 2', font_icon: 'bi bi-people') %>
  #     <% end %>
  #   <% end %>
  #
  renders_many :menu_items, Layout::Admin::Aside::MenuItemComponent

  def initialize(classes: '')
    @classes = class_names(classes)
  end

end
