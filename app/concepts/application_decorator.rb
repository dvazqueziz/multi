class ApplicationDecorator < Draper::Decorator

  delegate :current_user, to: :h
  delegate :name, :created_at
end
