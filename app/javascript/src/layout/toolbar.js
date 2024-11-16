"use strict";

// Class definition
var LayoutToolbar = function () {
    // Private variables
    var toolbar;

    // Private functions
    var initForm = function () {
        var rangeSlider = document.querySelector("#kt_toolbar_slider");
        var rangeSliderValueElement = document.querySelector("#kt_toolbar_slider_value");

        if (!rangeSlider) {
            return;
        }

        noUiSlider.create(rangeSlider, {
            start: [5],
            connect: [true, false],
            step: 1,
            format: wNumb({
                decimals: 1
            }),
            range: {
                min: [1],
                max: [10]
            }
        });

        rangeSlider.noUiSlider.on("update", function (values, handle) {
            rangeSliderValueElement.innerHTML = values[handle];
        });

        var handle = rangeSlider.querySelector(".noUi-handle");

        handle.setAttribute("tabindex", 0);

        handle.addEventListener("click", _click);

        handle.addEventListener("keydown", _keydown(rangeSlider));
    }

    var _click = function () {
        this.focus();
    }

    var _keydown = function (event, rangeSlider) {
        var value = Number(rangeSlider.noUiSlider.get());

        switch (event.which) {
            case 37:
                rangeSlider.noUiSlider.set(value - 1);
                break;
            case 39:
                rangeSlider.noUiSlider.set(value + 1);
                break;
        }
    }

    // Public methods
    return {
        init: function () {
            // Elements
            toolbar = document.querySelector('#kt_toolbar');

            if (!toolbar) {
                return;
            }

            initForm();
        }
    };
}();

export {LayoutToolbar}
// On document ready
// Util.onDOMContentLoaded(function () {
//     LayoutToolbar.init();
// });