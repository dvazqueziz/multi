import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="utils--confirm"
export default class extends Controller {

    static values = {
        title: String,
        text: String,
        icon: String,
        confirmText: String,
        showCancel: Boolean,
        cancelText: String
    }

    click(event) {
        let context = this
        event.preventDefault()
        let element = this.element
        let title = this.titleValue;
        let text = this.textValue;
        let icon = this.iconValue;
        let confirmText = this.confirmText
        let showCancel = this.showCancelValue;
        let cancelText = this.cancelTextValue;

        Swal.fire({
            title: title || '¿Estás seguro?',
            text: text || '',
            icon: icon || 'warning',
            showCancelButton: showCancel || true,
            confirmButtonText: confirmText || 'Aceptar',
            cancelButtonText: cancelText || 'Cancelar',
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: 'btn btn-danger'
            }
        }).then((result) => {

            if (result.isConfirmed) {
                let dataAttribute = 'data-controller'
                let attribute = element.getAttribute(dataAttribute)
                element.removeAttribute(dataAttribute)
                setTimeout(function () {
                    element.click()
                    element.setAttribute(dataAttribute, attribute);
                })

            }
        })
    }
}
