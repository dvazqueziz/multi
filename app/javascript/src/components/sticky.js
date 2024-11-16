"use strict";

// Class definition

import {EventHandler, Util} from "./index";

var Sticky = function (element, options) {
    ////////////////////////////
    // ** Private Variables  ** //
    ////////////////////////////
    var the = this;
    var body = document.getElementsByTagName("BODY")[0];

    if (typeof element === "undefined" || element === null) {
        return;
    }

    // Default Options
    var defaultOptions = {
        offset: 200,
        releaseOffset: 0,
        reverse: false,
        animation: true,
        animationSpeed: '0.3s',
        animationClass: 'animation-slide-in-down'
    };
    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var _construct = function () {
        if (Util.data(element).has('sticky') === true) {
            the = Util.data(element).get('sticky');
        } else {
            _init();
        }
    }

    var _init = function () {
        the.element = element;
        the.options = Util.deepExtend({}, defaultOptions, options);
        the.uid = Util.getUniqueId('sticky');
        the.name = the.element.getAttribute('data-kt-sticky-name');
        the.attributeName = 'data-kt-sticky-' + the.name;
        the.eventTriggerState = true;
        the.lastScrollTop = 0;
        the.scrollHandler;

        // Set initialized
        the.element.setAttribute('data-controller', 'components--sticky');

        // Event Handlers
        window.addEventListener('scroll', _scroll);

        // Initial Launch
        _scroll();

        // Bind Instance
        Util.data(the.element).set('sticky', the);
    }

    var _scroll = function (e) {
        var offset = _getOption('offset');
        var releaseOffset = _getOption('release-offset');
        var reverse = _getOption('reverse');
        var st;
        var attrName;
        var diff;

        // Exit if false
        if (offset === false) {
            return;
        }

        offset = parseInt(offset);
        releaseOffset = releaseOffset ? parseInt(releaseOffset) : 0;
        st = Util.getScrollTop();
        diff = document.documentElement.scrollHeight - window.innerHeight - Util.getScrollTop();

        if (reverse === true) {  // Release on reverse scroll mode
            if (st > offset && (releaseOffset === 0 || releaseOffset < diff)) {
                if (body.hasAttribute(the.attributeName) === false) {
                    _enable();
                    body.setAttribute(the.attributeName, 'on');
                }

                if (the.eventTriggerState === true) {
                    EventHandler.trigger(the.element, 'kt.sticky.on', the);
                    EventHandler.trigger(the.element, 'kt.sticky.change', the);

                    the.eventTriggerState = false;
                }
            } else { // Back scroll mode
                if (body.hasAttribute(the.attributeName) === true) {
                    _disable();
                    body.removeAttribute(the.attributeName);
                }

                if (the.eventTriggerState === false) {
                    EventHandler.trigger(the.element, 'kt.sticky.off', the);
                    EventHandler.trigger(the.element, 'kt.sticky.change', the);
                    the.eventTriggerState = true;
                }
            }

            the.lastScrollTop = st;
        } else { // Classic scroll mode
            if (st > offset && (releaseOffset === 0 || releaseOffset < diff)) {
                if (body.hasAttribute(the.attributeName) === false) {
                    _enable();
                    body.setAttribute(the.attributeName, 'on');
                }

                if (the.eventTriggerState === true) {
                    EventHandler.trigger(the.element, 'kt.sticky.on', the);
                    EventHandler.trigger(the.element, 'kt.sticky.change', the);
                    the.eventTriggerState = false;
                }
            } else { // back scroll mode
                if (body.hasAttribute(the.attributeName) === true) {
                    _disable();
                    body.removeAttribute(the.attributeName);
                }

                if (the.eventTriggerState === false) {
                    EventHandler.trigger(the.element, 'kt.sticky.off', the);
                    EventHandler.trigger(the.element, 'kt.sticky.change', the);
                    the.eventTriggerState = true;
                }
            }
        }

        if (releaseOffset > 0) {
            if (diff < releaseOffset) {
                the.element.setAttribute('data-kt-sticky-released', 'true');
            } else {
                the.element.removeAttribute('data-kt-sticky-released');
            }
        }
    }

    var _enable = function (update) {
        var top = _getOption('top');
        var left = _getOption('left');
        var right = _getOption('right');
        var width = _getOption('width');
        var zindex = _getOption('zindex');
        var dependencies = _getOption('dependencies');
        var classes = _getOption('class');
        var height = _calculateHeight();

        if (update !== true && _getOption('animation') === true) {
            Util.css(the.element, 'animationDuration', _getOption('animationSpeed'));
            Util.animateClass(the.element, 'animation ' + _getOption('animationClass'));
        }

        if (classes !== null) {
            Util.addClass(the.element, classes);
        }

        if (zindex !== null) {
            Util.css(the.element, 'z-index', zindex);
            Util.css(the.element, 'position', 'fixed');
        }

        if (top !== null) {
            Util.css(the.element, 'top', top);
        }

        if (width !== null) {
            if (width['target']) {
                var targetElement = document.querySelector(width['target']);
                if (targetElement) {
                    width = Util.css(targetElement, 'width');
                }
            }

            Util.css(the.element, 'width', width);
        }

        if (left !== null) {
            if (String(left).toLowerCase() === 'auto') {
                var offsetLeft = Util.offset(the.element).left;

                if (offsetLeft > 0) {
                    Util.css(the.element, 'left', String(offsetLeft) + 'px');
                }
            } else {
                Util.css(the.element, 'left', left);
            }
        }

        if (right !== null) {
            Util.css(the.element, 'right', right);
        }

        // Height dependencies
        if (dependencies !== null) {
            var dependencyElements = document.querySelectorAll(dependencies);

            if (dependencyElements && dependencyElements.length > 0) {
                for (var i = 0, len = dependencyElements.length; i < len; i++) {
                    Util.css(dependencyElements[i], 'padding-top', String(height) + 'px');
                }
            }
        }
    }

    var _disable = function () {
        Util.css(the.element, 'top', '');
        Util.css(the.element, 'width', '');
        Util.css(the.element, 'left', '');
        Util.css(the.element, 'right', '');
        Util.css(the.element, 'z-index', '');
        Util.css(the.element, 'position', '');

        var dependencies = _getOption('dependencies');
        var classes = _getOption('class');

        if (classes !== null) {
            Util.removeClass(the.element, classes);
        }

        // Height dependencies
        if (dependencies !== null) {
            var dependencyElements = document.querySelectorAll(dependencies);

            if (dependencyElements && dependencyElements.length > 0) {
                for (var i = 0, len = dependencyElements.length; i < len; i++) {
                    Util.css(dependencyElements[i], 'padding-top', '');
                }
            }
        }
    }

    var _calculateHeight = function () {
        var height = parseFloat(Util.css(the.element, 'height'));

        height = height + parseFloat(Util.css(the.element, 'margin-top'));
        height = height + parseFloat(Util.css(the.element, 'margin-bottom'));

        if (Util.css(element, 'border-top')) {
            height = height + parseFloat(Util.css(the.element, 'border-top'));
        }

        if (Util.css(element, 'border-bottom')) {
            height = height + parseFloat(Util.css(the.element, 'border-bottom'));
        }

        return height;
    }

    var _getOption = function (name) {
        if (the.element.hasAttribute('data-kt-sticky-' + name) === true) {
            var attr = the.element.getAttribute('data-kt-sticky-' + name);
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
        window.removeEventListener('scroll', _scroll);
        Util.data(the.element).remove('sticky');
    }

    // Construct Class
    _construct();

    ///////////////////////
    // ** Public API  ** //
    ///////////////////////

    // Methods
    the.update = function () {
        if (body.hasAttribute(the.attributeName) === true) {
            _disable();
            body.removeAttribute(the.attributeName);
            _enable(true);
            body.setAttribute(the.attributeName, 'on');
        }
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
Sticky.getInstance = function (element) {
    if (element !== null && Util.data(element).has('sticky')) {
        return Util.data(element).get('sticky');
    } else {
        return null;
    }
}

// Global Handlers
Sticky.initGlobalHandlers = function () {
    // Window resize handler
    window.addEventListener('resize', Sticky.resize);
}

Sticky.resize = function () {
    var timer;
    var body = document.getElementsByTagName("BODY")[0];

    Util.throttle(timer, function () {
        // Locate and update Offcanvas instances on window resize
        var elements = body.querySelectorAll('[data-controller="components--sticky"]');

        if (elements && elements.length > 0) {
            for (var i = 0, len = elements.length; i < len; i++) {
                var sticky = Sticky.getInstance(elements[i]);
                if (sticky) {
                    sticky.update();
                }
            }
        }
    }, 200);
}
// Create instances
Sticky.createInstances = function (selector = '[data-controller="components--sticky"]') {
    var body = document.getElementsByTagName("BODY")[0];

    // Initialize Menus
    var elements = body.querySelectorAll(selector);
    var sticky;

    if (elements && elements.length > 0) {
        for (var i = 0, len = elements.length; i < len; i++) {
            // Initialize instances
            let instance = Sticky.getInstance(elements[i])
            if (!instance) {
                sticky = new Sticky(elements[i]);
            }
        }
    }
}


// Global initialization

Sticky.bootstrap = () => {
    Sticky.initGlobalHandlers()
    Sticky.createInstances()
}

Sticky.reinitialization = () => {
    Sticky.createInstances()
}

export {Sticky}