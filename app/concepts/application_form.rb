class ApplicationForm < ::Reform::Form

  def helpers
    ActionView::Base.new(nil, {}, nil)
  end

  alias_method :h, :helpers


end