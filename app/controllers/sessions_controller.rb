class SessionsController < ::Devise::SessionsController

  # include Pundit

  def create
    # self.resource = warden.authenticate!(auth_options)
    # set_flash_message!(:notice, :signed_in)
    # sign_in(resource_name, resource)
    # yield resource if block_given?
    # respond_with resource, location: after_sign_in_path_for(resource)

    email = params[:user][:email]
    remember_me = params[:user][:remember_me]

    user = User.find_by(email: params[:user][:email])
    if user.present? && !user.confirmed?
      return redirect_to new_user_session_path(user), :flash => { :alert => t('devise.failure.unconfirmed') }
    end

    catch(:warden) do
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      respond_with resource, location: after_sign_in_path_for(resource)
      create_session(user: resource, email: email, remember_me: remember_me, success: true)
      return
    end

    # When authentication fails
    create_session(user: nil, email: email, remember_me: remember_me, success: false)
    throw :warden

  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    respond_to_on_destroy
  end


  private

  def create_session(user:, email:, remember_me:, success:)

    user_agent = DeviceDetector.new(request.env['HTTP_USER_AGENT'])

    operating_system_params = {
      name: user_agent.os_name,
      version: user_agent.os_full_version
    }

    device_params = {
      name: user_agent.name
    }

    app_params = {
      code: 'PanelAdmin1',
      version: Rails.application.config.app_version
    }

    browser_params = {
      name: user_agent.name,
      version: user_agent.full_version
    }

    begin
      ::Sessions::Create.new.execute(user: user,
                                     email: email,
                                     operating_system_params: operating_system_params,
                                     device_params: device_params,
                                     app_params: app_params,
                                     browser_params: browser_params,
                                     locale: I18n.locale,
                                     ip: request.remote_ip,
                                     auth_successful: success,
                                     remember_me: remember_me)
    rescue
    end

  end


  def respond_to_on_destroy
    respond_to do |format|
      format.all { redirect_to root_path(format: :html) }

    end
  end

end
