module Sessions
  module Services
    class Create < ApplicationService

      def execute(user: nil,
                  email: nil,
                  operating_system_params:,
                  device_params:,
                  app_params:,
                  browser_params: nil,
                  locale:,
                  network_type_code: nil,
                  ip:,
                  latitude: nil,
                  longitude: nil,
                  auth_successful: nil,
                  remember_me: nil)

        Session.transaction do

          operating_system = OperatingSystem.find_by(name: operating_system_params[:name])

          raise Exceptions::NotFoundError.new(OperatingSystem) if operating_system.nil?

          operating_system_version = find_or_create_operating_system_version(operating_system: operating_system,
                                                                             operating_system_params: operating_system_params)

          app = App.find_by(code: app_params[:code])

          raise Exceptions::NotFoundError.new(App) if app.nil?

          app_version = find_or_create_app_version(operating_system_version: operating_system_version,
                                                   app_params: app_params)

          device = get_device(device_params: device_params, user: user, operating_system_version: operating_system_version)

          code = generate_code

          browser_version = find_or_create_browser_version(browser_params: browser_params)

          session = Session.new(
            code: code,
            user: user,
            email: email,
            app_version: app_version,
            browser_version: browser_version,
            device: device,
            operating_system_version: operating_system_version,
            locale: locale,
            network_type: build_network_type(network_type_code: network_type_code),
            ip: ip,
            latitude: latitude,
            longitude: longitude,
            auth_successful: auth_successful,
            remember_me: remember_me
          )
          session.save!

          session

        end
      end

      private

      def find_or_create_operating_system_version(operating_system:, operating_system_params:)
        Base::FindOrCreateBy.execute(
          klass: OperatingSystemVersion,
          params: {
            operating_system: operating_system,
            name: operating_system_params[:version]
          }).value
      end

      def find_or_create_app_version(operating_system_version:, app_params:)
        Base::FindOrCreateBy.execute(
          klass: AppVersion,
          params: {
            app: app,
            operating_system: operating_system_version.operating_system,
            name: app_params[:version]
          }).value
      end

      def find_or_create_browser_version(browser_params:)
        if browser_params
          browser = Base::FindOrCreateBy.execute(
            klass: Browser,
            params: {
              name: browser_params[:name]
            }).value
          Base::FindOrCreateBy.execute(
            klass: BrowserVersion,
            params: {
              browser: browser,
              name: browser_params[:version]
            }).value
        end
      end

      def get_device(device_params:, user:, operating_system_version:)
        device_manufacturer = Base::FindOrCreateBy.new.execute(
          klass: DeviceManufacturer,
          params: {
            name: device_params[:manufacturer]
          }).value

        device_model = Base::FindOrCreateBy.new.execute(
          klass: DeviceModel,
          params: {
            device_manufacturer: device_manufacturer,
            name: device_params[:model]
          }).value

        uuid = device_params[:uuid]

        if Device.exists?(uuid: uuid)
          device = Device.find_by(uuid: uuid)
          device = Base::Update.new.execute(
            model: device,
            params: {
              user: user,
              operating_system_version: operating_system_version
            }).value
        else
          device = Base::Create.new.execute(
            klass: Device,
            params: {
              user: user,
              uuid: uuid,
              operating_system_version: operating_system_version,
              device_model: device_model
            }).value
        end
        device
      end

      def build_network_type(network_type_code:)
        network_type_code.nil? ? NetworkType.unknown : NetworkType.find_by(code: network_type_code)
      end

      def generate_code
        loop do
          code = Devise.friendly_token
          return code unless Session.exists?(code: code)
        end
      end

    end
  end
end