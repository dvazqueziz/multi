import {Controller} from "@hotwired/stimulus"
import {Sticky} from "../../src/components";

// Connects to data-controller="components--sticky"
export default class extends Controller {
    initialize() {
        let instance = Sticky.getInstance(this.element)
        if (!instance) {
            this.stickyInstance = new Sticky(this.element)
        }
    }
}
