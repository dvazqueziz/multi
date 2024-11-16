import {Controller} from "@hotwired/stimulus"
import {PasswordMeter} from "../../src/components";

// Connects to data-controller="components--password-meter"
export default class extends Controller {
    initialize() {
        let instance = PasswordMeter.getInstance(this.element)
        if (!instance) {
            this.passwordMeterInstance = new PasswordMeter(this.element)
        }
    }
}
