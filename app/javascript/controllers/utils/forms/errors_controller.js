import {Controller} from "@hotwired/stimulus"
import {Util} from "../../../src/components";

// Connects to data-controller="utils--forms--errors"
export default class extends Controller {

    static values = {
        formId: String,
        model: String
    }

    connect() {
        let context = this
        let errorTargets = this.element.querySelectorAll('[data-utils--forms--errors-target]');
        let form = document.getElementById(this.formIdValue)
        let model = this.modelValue

        form.querySelectorAll('.invalid-feedback').forEach(element => element.remove());
        form.querySelectorAll('.is-invalid').forEach(element => element.classList.remove("is-invalid"))

        errorTargets.forEach(function (errorTarget) {
            let attribute = errorTarget.getAttribute('data-utils--forms--errors-target')
            let humanizeAttribute = errorTarget.getAttribute('data-utils--forms--errors-humanize-target')
            let formField = form.querySelectorAll('[name="' + model + '[' + attribute + ']"]')[0]
            let errorElement = document.createElement('div')

            if (typeof formField === 'undefined') {
                context._showAlert(humanizeAttribute, errorTarget.innerHTML)
            } else {
                errorElement.classList.add('fv-plugins-message-container', 'invalid-feedback')
                errorElement.textContent = errorTarget.innerHTML
                formField.classList.add('is-invalid')
                formField.parentNode.insertBefore(errorElement, formField.nextSibling)
            }

        })

    }

    _showAlert(attribute, message) {
        Swal.fire({
            html: attribute + ': ' + message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok",
            customClass: {
                confirmButton: "btn btn-primary"
            }
        });
    }
}
