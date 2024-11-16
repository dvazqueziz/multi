class User < ApplicationRecord

  rolify

  validates_presence_of :name, :email, :api_key, :locale
  validates_uniqueness_of :email
  validates_uniqueness_of :api_key

  validates :name, length: { maximum: 80, too_long: "debe tener menos de %{count} caracteres", allow_blank: false }
  validates :surname, length: { maximum: 80, too_long: "debe tener menos de %{count} caracteres", allow_blank: true }

  devise :registerable,
         :database_authenticatable,
         :recoverable,
         :rememberable,
         :validatable,
         :confirmable,
         :trackable

  def full_name
    return self.name if self.surname.nil?
    self.name + ' ' + self.surname
  end

end
