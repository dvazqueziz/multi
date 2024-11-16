# frozen_string_literal: true

class TurboDrawerComponent < ApplicationComponent

  DIRECTION_DEFAULT = :end
  DIRECTION_OPTIONS = %i[start end]

  def initialize(title:,
                 width: '500px',
                 direction: DIRECTION_DEFAULT,
                 close_button_id: 'kt_drawer_close_button')
    @title = title
    @width = width
    @direction = direction
    @close_button_id = close_button_id
  end

end

