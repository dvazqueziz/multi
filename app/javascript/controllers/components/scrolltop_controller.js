import {Controller} from "@hotwired/stimulus"
import {Scroll, Scrolltop} from "../../src/components";

// Connects to data-controller="components--scrolltop"
export default class extends Controller {
    initialize() {
        let instance = new Scrolltop(this.element)
        if (!instance) {
            this.scrolltopInstance = new Scrolltop(this.element)
        }
    }

}
