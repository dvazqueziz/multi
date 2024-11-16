require 'dry/monads'

class ApplicationService
  include Dry::Monads[:result]

  def self.execute(**args)
    new.service_execute(**args)
  end

  def service_execute(**args)
    begin
      result = execute(**args)
    rescue Exception => e
      return Failure(e)
    end

    raise TypeError, 'Los servicios tienen que devolver un objeto de tipo Success' unless [Success, Failure].member? result.class

    result
  end

  def execute
    raise 'Must be implemented by subclasses'
  end

end