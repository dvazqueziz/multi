module Users
  module UseCases
    class CreateByAdmin < ApplicationUseCase

      def initialize(validator: ::Users::Validators::CreateByAdmin.new)
        @validator = validator
      end

      def execute(params:)
        params = yield check_errors(params)
        role = yield get_role(params[:role_id])
        user_params = yield build_user_params(params)
        user = yield create_user(user_params)
        yield add_role(user: user, role: role)
        Success(user)
      end

      private

      def check_errors(params)
        result = @validator.execute(params)
        if result.success?
          Success(result.to_h)
        else
          Failure(result.errors.to_h)
        end
      end

      def build_user_params(params)
        api_key = ::Users::Services::GenerateApiKey.execute.value!
        locale = ::Users::Services::GetDefaultLocale.execute.value!
        password = Devise.friendly_token.first(Devise.password_length.min)
        params = params.merge({
                                api_key: api_key,
                                locale: locale,
                                password: password
                              })
        params.delete(:role_id)
        Success(params)
      end

      def get_role(role_id)
        role = Role.find(role_id)
        Success(role)
      end

      def create_user(params)
        user = User.new(params)

        if user.save
          Success(user)
        else
          Failure(user.errors.messages)
        end
      end

      def add_role(user:, role:)
        user.add_role(role.name)
        Success(user)
      end

    end
  end
end