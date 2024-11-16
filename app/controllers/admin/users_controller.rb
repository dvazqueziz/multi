module Admin
  class UsersController < BaseController

    before_action :add_index_breadcrumb

    def index
      authorize User

      result = ::Users::UseCases::Search.execute(query_params: params[:query])

      if result.success?
        @query = result.value!
        @pagy, users = pagy(@query.result.includes(:roles))
        @users = ::Users::Decorators::Base.decorate_collection(users)
      else
        flash[:error] = _('Ha ocurrido un error')
        redirect_to admin_users_path
      end
    end

    def new
      authorize User
      @form = ::Users::Forms::Base.new(User.new)
                                  .prepopulate!(role_id: Role.first.id)
    end

    def create
      authorize User
      result = ::Users::UseCases::CreateByAdmin.execute(params: params[:user])
      respond_to do |format|
        if result.success?
          format.html { redirect_to admin_users_path, notice: _('Usuario creado correctamente') }
        else
          @errors = result.failure
          format.turbo_stream { render :form_update,
                                       status: :unprocessable_entity }
        end
      end
    end

    def edit
      authorize User
      result = ::Base::Services::Find.execute(klass: User, id: params[:id])
      if result.success?
        @form = ::Users::Forms::Base.new(result.value!)
                                    .prepopulate!(role_id: result.value!.roles.first.id)
      else
        flash[:error] = _('El usuario no existe')
        redirect_to admin_users_path
      end
    end

    def update
      authorize User
      result = ::Users::UseCases::Update.execute(user_id: params[:id],
                                                 params: params[:user])

      respond_to do |format|
        if result.success?
          format.html { redirect_to admin_users_path, notice: _('Usuario actualizado correctamente') }
        else
          @errors = result.failure
          format.turbo_stream { render :form_update,
                                       status: :unprocessable_entity }
        end
      end
    end

    def destroy
      authorize User
      result = ::Users::UseCases::Destroy.execute(user_id: params[:id])

      respond_to do |format|
        if result.success?
          format.turbo_stream { render turbo_stream: turbo_stream.remove(result.value!) }
          format.html { redirect_to admin_users_path, notice: _('Usuario eliminado correctamente') }
        else
          flash[:error] = _('Ha ocurrido un error')
          redirect_to admin_users_path
        end
      end

    end

    def show
      authorize User
      result = ::Base::Services::Find.execute(klass: User, id: params[:id])
      if result.success?
        user = User.find(params[:id])
        @user = ::Users::Decorators::Base.new(user)
      else
        flash[:error] = _('El usuario no existe')
        redirect_to admin_users_path
      end
    end

    def profile
      result = ::Base::Services::Find.execute(klass: User, id: params[:id])
      if result.success?
        authorize result.value!
        @user = ::Users::Decorators::Base.new(result.value!)
      end
    end

    private

    def add_index_breadcrumb
      add_breadcrumb(title: _('Usuarios'))
    end

  end
end