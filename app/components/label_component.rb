# frozen_string_literal: true

class LabelComponent < ApplicationComponent
  def initialize(form: nil, attribute: nil, name: nil, label: nil, required: false, label_options: {})
    @form = form
    @attribute = attribute
    @name = name
    @label = label
    @required = required
    @label_options = label_options
  end

  def label_options
    if @label_options[:class].nil?
      @label_options[:class] = class_names('fw-bold fs-6 mb-2')
    end

    default_options = {}
    default_options.deep_merge(@label_options).compact.tap do |opts|
      opts[:class] = class_names(
        opts[:class],
        "required": @required,
      )
    end
  end

end
