# frozen_string_literal: true

class TextFieldComponent < ApplicationComponent

  TYPE_DEFAULT = :text
  TYPE_OPTIONS = %i[
      text number email password search tel url date
      datetime_local month time week currency
    ]

  def initialize(form: nil,
                 attribute: nil,
                 name: nil,
                 type: TYPE_DEFAULT,
                 label: nil,
                 placeholder: nil,
                 maxlength: nil,
                 minlength: nil,
                 step: 1,
                 min: 0,
                 max: 1_000_000,
                 rows: 2,
                 multiline: false,
                 disabled: false,
                 required: false,
                 input_options: {},
                 label_options: {})
    @form = form
    @attribute = attribute
    @name = name
    @type = type
    @label = label
    @placeholder = placeholder
    @maxlength = maxlength
    @minlength = minlength
    @step = step
    @min = min
    @max = max
    @rows = rows
    @multiline = multiline
    @disabled = disabled
    @required = required
    @input_options = input_options
    @label_options = label_options
  end

  def input_options
    default_options = {
      value: @value,
      disabled: @disabled,
      required: @required,
      placeholder: @placeholder,
      maxlength: @maxlength,
      minlength: @minlength,
    }

    if @type == :number
      default_options.merge!({ step: @step, min: @min, max: @max })
    end

    if @multiline
      default_options[:rows] = @rows
    end

    default_options.deep_merge(@input_options).compact.tap do |opts|
      opts[:class] = class_names(
        opts[:class],
        'form-control'
      )
    end
  end


  def input
    case @type
    when :text
      @multiline ? "text_area" : "text_field"
    when :tel then "telephone_field"
    when :currency then "text_field"
    else
      "#{@type}_field"
    end
  end

  def input_tag
    "#{input}_tag"
  end

end
