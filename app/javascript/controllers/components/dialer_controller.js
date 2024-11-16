import {Controller} from "@hotwired/stimulus"
import {Dialer} from "../../src/components";

// Connects to data-controller="components--dialer"
export default class extends Controller {
    initialize() {
        let instance = Dialer.getInstance(this.element)
        if (!instance) {
            this.dialerInstance = new Dialer(this.element)
        }
    }
}
