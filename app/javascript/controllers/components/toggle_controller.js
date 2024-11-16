import {Controller} from "@hotwired/stimulus"
import {Toggle} from "../../src/components";

// Connects to data-controller="components--toggle"
export default class extends Controller {
    initialize() {
        let instance = Toggle.getInstance(this.element)
        if (!instance) {
            this.toggleInstance = new Toggle(this.element);
        }
    }
}
