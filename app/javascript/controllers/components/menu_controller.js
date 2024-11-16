import {Controller} from "@hotwired/stimulus"
import {Menu} from "../../src/components";

// Connects to data-controller="components--menu"
export default class extends Controller {

    initialize() {
        let instance = Menu.getInstance(this.element)
        if (!instance) {
            this.menuInstance = new Menu(this.element)
        }
    }

}
