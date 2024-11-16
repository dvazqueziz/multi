class AppVersion < ApplicationRecord

  belongs_to :operating_system
  belongs_to :app

  validates_presence_of :name, :app, :operating_system
  validates_uniqueness_of :name, scope: [:app, :operating_system]

end
