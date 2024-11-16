module Users
  module UseCases

    class Update < ApplicationUseCase

      def initialize(validator: ::Users::Validators::Update.new)
        @validator = validator
      end

      def execute(user_id:, params:)
        user = yield find_user(user_id)
        params = yield check_errors(params)
        role = yield get_role(params[:role_id])
        user = yield update_user(user: user, params: params)
        yield update_user_role(user: user, role: role)
        Success(user)
      end

      def find_user(user_id)
        user = User.find_by(id: user_id)
        if user
          Success(user)
        else
          Failure(:user_not_found)
        end
      end

      def get_role(role_id)
        role = Role.find(role_id)
        Success(role)
      end

      def check_errors(params)
        result = @validator.execute(params)
        if result.success?
          Success(result.to_h)
        else
          Failure(result.errors.to_h)
        end
      end

      def update_user(user:, params:)
        params.delete(:role_id)

        if user.update(params)
          Success(user)
        else
          Failure(user.errors.messages)
        end
      end

      def update_user_role(user:, role:)
        if user.has_role?(role.name)
          Success(user)
        else
          user.roles.each { |role_item| user.remove_role(role_item.name) }
          user.add_role(role.name)
          Success(user)
        end
      end

    end
  end
end