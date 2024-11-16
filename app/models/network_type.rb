class NetworkType < ApplicationRecord

  validates_presence_of :code, :name
  validates_uniqueness_of :code
  validates_uniqueness_of :name

  def self.wifi
    NetworkType.find_by(code: 'wifi')
  end

  def self.wwan
    NetworkType.find_by(code: 'wwan')
  end

  def self.unknown
    NetworkType.find_by(code: 'unknown')
  end

end
