import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="flash"
export default class extends Controller {

  initialize() {
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toastr-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
  connect() {
    let type = this.element.dataset.flashType
    let message = this.element.dataset.flashMessage

    type = type === 'notice' ? 'success' : type
    type = type === 'alert' ? 'warning' : type

    toastr[type](message);
  }
}
