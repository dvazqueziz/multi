# frozen_string_literal: true

class Layout::Admin::Aside::MenuItemComponent < Component
  renders_many :sub_items, Layout::Admin::Aside::MenuItemComponent

  def initialize(to: '#', title:, description: nil, icon: nil, font_icon: nil, has_bullet: false)
    @to = to
    @description = description
    @body = Layout::Admin::Aside::MenuItemBodyComponent.new(title: title,
                                                            icon: icon,
                                                            font_icon: font_icon,
                                                            has_bullet: has_bullet)
  end

  def arguments
    opts = {}
    if sub_items.present?
      opts[:class] = class_names('menu-item',
                                 'menu-accordion',
                                 'here show': is_active?)
      opts[:'kt-menu-trigger'] = 'click'
    else
      opts[:class] = class_names('menu-link',
                                 'without-sub',
                                 'active': is_active?)
      unless @description.nil?
        opts[:'data-controller'] = 'components--tooltip'
        opts[:'data-bs-trigger'] = 'hover'
        opts[:'data-bs-dismiss'] = 'click'
        opts[:'data-bs-placement'] = 'right'
        opts[:'data-bs-original-title'] = @description
      end
    end
    opts
  end

  def sub_item_classes
    class_names('menu-sub ',
                'menu-sub-accordion',
                'menu-active-bg': is_active?)
  end

  private

  def is_active?
    current_page?(@to)
  end

end

