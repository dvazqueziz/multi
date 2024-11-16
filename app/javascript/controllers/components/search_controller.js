import {Controller} from "@hotwired/stimulus"
import {Search} from "../../src/components";

// Connects to data-controller="components--search"
export default class extends Controller {
    initialize() {
        let instance = Search.getInstance(this.element)
        if (!instance) {
            this.searchInstance = new Search(this.element)
        }
    }
}
