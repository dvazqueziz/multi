"use strict";

// Class definition
import {EventHandler, Util} from "./index";

var Swapper = function (element, options) {
    ////////////////////////////
    // ** Private Variables  ** //
    ////////////////////////////
    var the = this;

    if (typeof element === "undefined" || element === null) {
        return;
    }

    // Default Options
    var defaultOptions = {
        mode: 'append'
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var _construct = function () {
        if (Util.data(element).has('swapper') === true) {
            the = Util.data(element).get('swapper');
        } else {
            _init();
        }
    }

    var _init = function () {
        the.element = element;
        the.options = Util.deepExtend({}, defaultOptions, options);

        // Set initialized
        the.element.setAttribute('data-controller', 'components--swapper');

        // Initial update
        _update();

        // Bind Instance
        Util.data(the.element).set('swapper', the);
    }

    var _update = function (e) {
        var parentSelector = _getOption('parent');

        var mode = _getOption('mode');
        var parentElement = parentSelector ? document.querySelector(parentSelector) : null;


        if (parentElement && element.parentNode !== parentElement) {
            if (mode === 'prepend') {
                parentElement.prepend(element);
            } else if (mode === 'append') {
                parentElement.append(element);
            }
        }
    }

    var _getOption = function (name) {
        if (the.element.hasAttribute('data-kt-swapper-' + name) === true) {
            var attr = the.element.getAttribute('data-kt-swapper-' + name);
            var value = Util.getResponsiveValue(attr);

            if (value !== null && String(value) === 'true') {
                value = true;
            } else if (value !== null && String(value) === 'false') {
                value = false;
            }

            return value;
        } else {
            var optionName = Util.snakeToCamel(name);

            if (the.options[optionName]) {
                return Util.getResponsiveValue(the.options[optionName]);
            } else {
                return null;
            }
        }
    }

    var _destroy = function () {
        Util.data(the.element).remove('swapper');
    }

    // Construct Class
    _construct();

    ///////////////////////
    // ** Public API  ** //
    ///////////////////////

    // Methods
    the.update = function () {
        _update();
    }

    the.destroy = function () {
        return _destroy();
    }

    // Event API
    the.on = function (name, handler) {
        return EventHandler.on(the.element, name, handler);
    }

    the.one = function (name, handler) {
        return EventHandler.one(the.element, name, handler);
    }

    the.off = function (name) {
        return EventHandler.off(the.element, name);
    }

    the.trigger = function (name, event) {
        return EventHandler.trigger(the.element, name, event, the, event);
    }
};

// Static methods
Swapper.getInstance = function (element) {
    if (element !== null && Util.data(element).has('swapper')) {
        return Util.data(element).get('swapper');
    } else {
        return null;
    }
}


// Global Handlers
Swapper.initGlobalHandlers = function () {

    // Window resize handler
    window.addEventListener('resize', Swapper.resize)
}

Swapper.resize = function () {
    var timer;

    Util.throttle(timer, function () {
        // Locate and update Offcanvas instances on window resize
        var elements = document.querySelectorAll('[data-controller="components--swapper"]');

        if (elements && elements.length > 0) {
            for (var i = 0, len = elements.length; i < len; i++) {
                var swapper = Swapper.getInstance(elements[i]);
                if (swapper) {
                    swapper.update();
                }
            }
        }
    }, 200);
}
// Create instances
Swapper.createInstances = function (selector = '[data-controller="components--swapper"]') {
    // Initialize Menus
    var elements = document.querySelectorAll(selector);
    var swapper;

    if (elements && elements.length > 0) {
        for (var i = 0, len = elements.length; i < len; i++) {
            // Initialize instances
            let instance = Swapper.getInstance(elements[i])
            if (!instance) {
                swapper = new Swapper(elements[i]);
            }
        }
    }
}


// Global initialization
Swapper.bootstrap = () => {
    Swapper.initGlobalHandlers();
    Swapper.createInstances()
}

Swapper.reinitialization = () => {
    Swapper.createInstances();
}

export {Swapper}