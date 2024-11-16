class Role < ApplicationRecord
  has_many :users_roles
  has_many :users, through: :users_roles

  belongs_to :resource,
             :polymorphic => true,
             :optional => true

  validates :resource_type,
            :inclusion => { :in => Rolify.resource_types },
            :allow_nil => true

  scopify

  translates :full_name

  validates_presence_of :name
  validates_uniqueness_of :name, scope: [:resource_type, :resource_id]

end
