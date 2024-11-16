module Users
  module Validators
    class Update < ApplicationValidator

      params do
        required(:name).filled(:string)
        required(:email).filled(:string)
        optional(:surname).filled(:string)
        required(:role_id).filled(:integer)
      end

      rule(:email).validate(:email_format)

    end

  end
end