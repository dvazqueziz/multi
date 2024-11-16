class DeviceModel < ApplicationRecord

  belongs_to :device_manufacturer
  has_many :devices, dependent: :destroy

  validates_presence_of :device_manufacturer, :name

  validates_presence_of :name
end
