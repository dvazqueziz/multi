# frozen_string_literal: true

class KTSVGComponent < ViewComponent::Base
  #TODO https://github.com/jamesmartin/inline_svg
  def initialize(class_name: '', path:, svg_class_name: 'mh-50px')
    @class_name = class_name
    @path = path
    @svg_class_name = svg_class_name
  end

end
