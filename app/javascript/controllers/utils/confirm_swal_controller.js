import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="utils--confirm-swal"
export default class extends Controller {

    initialize() {
        this.message = this.element.dataset.swalConfirm
        this.text = this.element.dataset.swalText
    }

    connect() {
        let context = this
        this.element.addEventListener('click', function () {
            context.showConfirmationDialog(context.message, context.text)
        })
    }

    showConfirmationDialog(message, text) {
        event.preventDefault();
        Swal.fire({
            title: message || '¿Estás seguro?',
            text: text || '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
        })
    }
}
