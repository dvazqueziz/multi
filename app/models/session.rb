class Session < ApplicationRecord

  belongs_to :user, optional: true
  belongs_to :device, optional: true
  belongs_to :operating_system_version
  belongs_to :browser_version, optional: true
  belongs_to :app_version
  belongs_to :network_type

  validates_presence_of :code, :app_version, :operating_system_version, :ip, :network_type, :locale
  validates_uniqueness_of :code

  validates_presence_of :device, unless: :browser_version_id?

end
