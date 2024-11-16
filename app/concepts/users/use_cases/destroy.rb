module Users
  module UseCases
    class Destroy < ApplicationUseCase

      def execute(user_id:)
        user = yield find_user(user_id)
        user = yield destroy_user(user)
        Success(user)
      end

      private

      def find_user(user_id)
        user = User.find(user_id)
        Success(user)
      end

      def destroy_user(user)
        user.destroy
        Success(user)
      end

    end
  end
end