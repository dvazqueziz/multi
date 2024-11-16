module Users
  module Validators
    class Search < ApplicationValidator

      params do
        optional(:name_or_surname_or_email_cont)
        optional(:s)
      end

    end

  end
end
