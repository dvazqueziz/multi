# frozen_string_literal: true

class RadioButtonComponent < ApplicationComponent

  def initialize(form: nil,
                 attribute: nil,
                 name: nil,
                 label: nil,
                 description: nil,
                 checked: false,
                 disabled: false,
                 help_text: nil,
                 value: nil,
                 wrapper_arguments: {},
                 input_options: {},
                 **system_arguments)
    @form = form
    @attribute = attribute
    @name = name
    @label = label
    @description = description
    @checked = checked
    @disabled = disabled
    @value = value

    @system_arguments = system_arguments
    @input_options = input_options
    @input_options[:classes] = class_names(
      @input_options[:classes],
      "form-check-input"
    )
  end

  def radio_button
    render BaseRadioButton.new(form: @form,
                               attribute: @attribute,
                               name: @name,
                               checked: @checked,
                               disabled: @disabled,
                               value: @value,
                               **@input_options
    )
  end
end
