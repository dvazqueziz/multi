class ApplicationValidator < Dry::Validation::Contract

  def execute(params)
    params = params.to_unsafe_hash if params.is_a? ActionController::Parameters
    self.call(params)
  end

end