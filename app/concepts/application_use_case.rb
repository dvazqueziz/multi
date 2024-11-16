require 'dry/monads'

class ApplicationUseCase

  include Dry::Monads[:result, :do]

  def self.execute(**args)
    new.execute(**args)
  end

end