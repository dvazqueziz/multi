import {Controller} from "@hotwired/stimulus"
import {ImageInput} from "../../src/components";

// Connects to data-controller="components--image-input"
export default class extends Controller {
    initialize() {
        let instance = ImageInput.getInstance(this.element)
        if (!instance) {
            this.imageInputInstance = new ImageInput(this.element)
        }
    }
}
