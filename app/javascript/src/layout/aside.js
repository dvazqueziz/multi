"use strict";

// Class definition
import {Toggle} from "../components";

var LayoutAside = function () {
    // Private variables
    var toggle;
    var aside;

    // Private functions
    var handleToggle = function () {
        var toggleObj = Toggle.getInstance(toggle);
        if (!toggleObj) {
            toggleObj = new Toggle(toggle)
        }

        // Add a class to prevent aside hover effect after toggle click
        toggleObj.on('kt.toggle.change', _toggleOnChange)
    }

    var _toggleOnChange = function () {

        let aside = document.querySelector('#kt_aside');
        aside.classList.add('animating');

        setTimeout(function () {
            aside.classList.remove('animating');
        }, 300);
    }

    // Public methods
    return {
        init: function () {
            // Elements
            aside = document.querySelector('#kt_aside');
            toggle = document.querySelector('#kt_aside_toggle');

            if (!aside || !toggle) {
                return;
            }

            handleToggle();
        },
    };
}();

export {LayoutAside}
// On document ready
// Util.onDOMContentLoaded(function () {
//     LayoutAside.init();
// });