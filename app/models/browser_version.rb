class BrowserVersion < ApplicationRecord

  belongs_to :browser

  validates_presence_of :browser, :name

end
