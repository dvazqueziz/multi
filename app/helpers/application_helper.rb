module ApplicationHelper

  include Pagy::Frontend

  def bootstrap_class_for(flash_type, type = :alert)
    bootstrap_classes = {
      success: {
        alert: 'alert-success',
        icon: 'bi bi-check-circle',
        text: 'text-success'
      },
      error: {
        alert: 'alert-danger',
        icon: 'bi bi-exclamation-triangle',
        text: 'text-danger'
      },
      alert: {
        alert: 'alert-warning',
        icon: 'bi bi-exclamation-circle',
        text: 'text-warning'
      },
      notice: {
        alert: 'alert-info',
        icon: 'bi bi-info-circle',
        text: 'text-info'
      } }

    bootstrap_classes[flash_type.to_sym][type.to_sym]
  end

end
