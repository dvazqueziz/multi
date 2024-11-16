class RegistrationsController < ::Devise::RegistrationsController

  before_action :configure_permitted_parameters

  def create(generate_api_key_service: ::Users::GenerateApiKey.new,
             get_default_locale_service: ::Users::GetDefaultLocale.new)
    build_resource(sign_up_params)
    resource.api_key = generate_api_key_service.execute
    resource.locale = get_default_locale_service.execute

    resource.save
    resource.add_role(:user)

    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :surname, :tos_agreement])
  end

end