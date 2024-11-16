class Device < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :operating_system_version
  belongs_to :device_model

  validates_presence_of :uuid, :operating_system_version, :device_model
  validates_uniqueness_of :uuid
  validates_uniqueness_of :device_token, allow_blank: true
  validates_uniqueness_of :fcm_token, allow_blank: true
end
