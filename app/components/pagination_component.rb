# frozen_string_literal: true

class PaginationComponent < ViewComponent::Base

  include Pagy::Frontend

  def initialize(pagy:, pagination_class: nil, link_extra: '')
    @pagy = pagy
    @pagination_class = pagination_class
    @link_extra = link_extra
  end

end
