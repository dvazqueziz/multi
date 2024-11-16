class OperatingSystem < ApplicationRecord

  has_many :operating_system_versions, dependent: :destroy
  has_many :app_versions

  scope :android, -> { where(name: 'Android') }
  scope :ios, -> { where(name: 'iOS') }

  validates_presence_of :name

end
