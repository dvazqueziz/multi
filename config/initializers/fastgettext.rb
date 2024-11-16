FastGettext.add_text_domain 'app', :path => 'locales', :type => :po
FastGettext.default_available_locales = %w[es en] #all you want to allow
FastGettext.default_text_domain = 'app'