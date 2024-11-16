import {Controller} from "@hotwired/stimulus"
import {Swapper} from "../../src/components";

// Connects to data-controller="components--swapper"
export default class extends Controller {
    initialize() {
        let instance = Swapper.getInstance(this.element)
        if (!instance) {
            this.swapperInstance = new Swapper(this.element)
        }
    }
}
