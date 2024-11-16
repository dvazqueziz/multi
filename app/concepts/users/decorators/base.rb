module Users
  module Decorators

    class Base < ApplicationDecorator

      decorates :user

      delegate :id, :email

      def full_name
        return model.name if model.surname.nil?
        "#{model.name} #{model.surname}"
      end

      def initial_capital_letters
        return model.name[0] if model.surname.nil?
        "#{model.name[0]}#{model.surname[0]}"
      end

      def role_name
        model.roles.first.full_name
      end

      def last_sign_in_at
        return _('Nunca') if model.last_sign_in_at.nil?
        h.distance_of_time_in_words(Time.now, model.last_sign_in_at, include_seconds: true)
      end

      def created_at
        model.created_at.strftime('%d/%m/%Y %H:%M')
      end

    end

  end
end