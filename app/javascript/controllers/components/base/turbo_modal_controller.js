import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="components--base--turbo-modal"
export default class extends Controller {
    connect() {
        this.modal = new bootstrap.Modal(this.element)
        this.modal.show()
    }

    hideBeforeRender(event) {
        if (this.isOpen()) {
            event.preventDefault()
            this.element.addEventListener('hidden.bs.modal', event.detail.resume)
            this.modal.hide()
        }
    }

    hide() {
        if (this.isOpen()) {
            this.modal.hide()
        }
    }

    isOpen() {
        return this.element.classList.contains("show")
    }


}
