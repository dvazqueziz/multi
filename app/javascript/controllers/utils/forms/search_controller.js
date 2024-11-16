import {Controller} from "@hotwired/stimulus"
import {displayLoading} from "../../../utils";

// Connects to data-controller="utils--forms--search"
export default class extends Controller {
    static targets = ["form"]
    static values = {
        loaderId: String
    }

    search() {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            if (this.hasLoaderIdValue) displayLoading(this.loaderIdValue)
            this.formTarget.requestSubmit()
        }, 250)
    }
}
