class App < ApplicationRecord
  validates_presence_of :code, :name
  validates_uniqueness_of :code
  validates_uniqueness_of :name
end
