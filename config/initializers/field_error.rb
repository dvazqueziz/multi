ActionView::Base.field_error_proc = Proc.new do |html_tag, instance_tag|
  fragment = Nokogiri::HTML.fragment(html_tag)
  field = fragment.at('input,select,textarea')

  html = if field
           error_message = instance_tag.error_message.join(', ')
           field['class'] = "#{field['class']} border-red-600 border focus:outline-none"
           html = <<-HTML
              #{fragment.to_s}
              <div class="fv-plugins-message-container invalid-feedback">
                #{error_message.upcase_first}
              </div>
           HTML
           html
         else
           html_tag
         end

  html.html_safe
end