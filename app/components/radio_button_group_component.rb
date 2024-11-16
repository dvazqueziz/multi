# frozen_string_literal: true

class RadioButtonGroupComponent < ApplicationComponent

  def initialize(form: nil,
                 collection:,
                 attribute: nil,
                 header_label: nil,
                 label_attribute: nil,
                 value_attribute: nil,
                 required: false,
                 separator: false,
                 classes: '')
    @form = form
    @collection = collection
    @attribute = attribute
    @header_label = header_label
    @label_attribute = label_attribute
    @value_attribute = value_attribute
    @required = required
    @separator = separator
    @classes = class_names(classes)
  end

  def separator_classes
   class_names('my-5',
               'separator separator-dashed': @separator)
  end

end
