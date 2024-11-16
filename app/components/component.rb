# frozen_string_literal: true

class Component < ViewComponent::Base
  include ::Base::ClassNameHelper
  include ::Turbo::FramesHelper
end