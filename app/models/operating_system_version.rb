class OperatingSystemVersion < ApplicationRecord
  belongs_to :operating_system
  has_many :devices

  validates_presence_of :operating_system, :name

end
