import {Controller} from "@hotwired/stimulus"
import {Scroll} from "../../src/components";

// Connects to data-controller="components--scroll"
export default class extends Controller {
    initialize() {
        let instance = Scroll.getInstance(this.element)
        if (!instance) {
            this.scrollInstance = new Scroll(this.element)
        }
    }
}
