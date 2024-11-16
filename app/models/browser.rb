class Browser < ApplicationRecord

  has_many :browser_versions, dependent: :destroy

  validates_presence_of :name
end
