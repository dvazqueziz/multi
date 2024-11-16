class DeviceManufacturer < ApplicationRecord

  has_many :device_models, dependent: :destroy

  validates_presence_of :name
  validates_uniqueness_of :name

end
