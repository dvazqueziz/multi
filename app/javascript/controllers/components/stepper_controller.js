import {Controller} from "@hotwired/stimulus"
import {Stepper} from "../../src/components";

// Connects to data-controller="components--stepper"
export default class extends Controller {
    initialize() {
        let instance = Stepper.getInstance(this.element)
        if (!instance) {
            this.stepperInstance = new Stepper(this.element)
        }
    }
}
