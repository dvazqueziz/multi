module Users
  module Forms
    class Base < ApplicationForm
      model :user

      property :name
      property :surname
      property :email
      property :role_id, virtual: true, prepopulator: ->(options) { self.role_id = options[:role_id] }

      def role_options
        Role.all.includes(:translations)
      end

    end
  end
end