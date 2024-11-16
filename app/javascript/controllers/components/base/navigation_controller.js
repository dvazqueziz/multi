import {Controller} from "@hotwired/stimulus"
import {getElementParents} from "../../../utils";

// Connects to data-controller="components--base--navigation"
export default class extends Controller {
    connect() {
        let elements = this.element.querySelectorAll('.menu-link.active')
        elements.forEach(function (element) {

            let fathers = getElementParents(element, '.menu-item.menu-accordion')

            fathers.forEach(function (father) {
                father.classList.add('here')
                father.classList.add('show')
            })
        })
    }

}
