class UserPolicy < ApplicationPolicy

  def profile?
    user == record
  end
  def index?
    user.has_role?(:admin) || user.has_role?(:manager)
  end
  
  def show?
    user.has_role?(:admin) || user == record
  end
  
  def create?
    user.has_role?(:admin)
  end
  def update?
    user.has_role?(:admin) || user == record
  end
  def destroy?
    user.has_role?(:admin)
  end
end
