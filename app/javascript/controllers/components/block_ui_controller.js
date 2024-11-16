import {Controller} from "@hotwired/stimulus"
import {BlockUI} from "../../src/components";

// Connects to data-controller="components--block-ui"
export default class extends Controller {
    initialize() {
        let instance = BlockUI.getInstance(this.element)
        if (!instance) {
            this.blockInstance = new BlockUI(this.element)
        }
    }
}
