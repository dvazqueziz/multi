import {Controller} from "@hotwired/stimulus"
import {Drawer} from "../../src/components";

// Connects to data-controller="components--drawer"
export default class extends Controller {

    static values = {
        show: Boolean
    }

    initialize() {
        let instance = Drawer.getInstance(this.element)
        if (!instance) {
            this.drawerInstance = new Drawer(this.element)
        }
    }

    connect() {
        if (this.hasShowValue && this.showValue) {
            this.drawerInstance.show()
        }
    }

    hideBeforeRender() {
        this.drawerInstance.hide()
    }
}


