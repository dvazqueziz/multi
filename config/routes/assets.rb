if Rails.env.development?
  redirector = lambda { |params, _req|
    ApplicationController.helpers.asset_path(params[:name].split('-').first + '.map')
  }
  constraint = ->(request) { request.path.ends_with?('.map') }
  get 'assets/*name', to: redirect(redirector), constraints: constraint
end
