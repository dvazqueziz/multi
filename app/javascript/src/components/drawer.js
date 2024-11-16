"use strict";

// Class definition
import {EventHandler, Util} from "./index";

var Drawer = function (element, options) {
    //////////////////////////////
    // ** Private variables  ** //
    //////////////////////////////
    var the = this;
    var body = document.getElementsByTagName("BODY")[0];

    if (typeof element === "undefined" || element === null) {
        return;
    }

    // Default options
    var defaultOptions = {
        overlay: true,
        direction: 'end',
        baseClass: 'drawer',
        overlayClass: 'drawer-overlay'
    };

    ////////////////////////////
    // ** Private methods  ** //
    ////////////////////////////

    var _construct = function () {
        if (Util.data(element).has('drawer')) {
            the = Util.data(element).get('drawer');
        } else {
            _init();
        }
    }

    var _init = function () {
        // Variables
        the.options = Util.deepExtend({}, defaultOptions, options);
        the.uid = Util.getUniqueId('drawer');
        the.element = element;
        the.overlayElement = null;
        the.name = the.element.getAttribute('data-kt-drawer-name');
        the.shown = false;
        the.lastWidth;
        the.toggleElement = null;

        // Set initialized
        the.element.setAttribute('data-controller', 'components--drawer');

        // Event Handlers
        _handlers();

        // Update Instance
        _update();

        // Bind Instance
        Util.data(the.element).set('drawer', the);
    }

    var _handlers = function () {
        var togglers = _getOption('toggle');
        var closers = _getOption('close');

        if (togglers !== null && togglers.length > 0) {
            Util.on(body, togglers, 'click', function (e) {
                e.preventDefault();

                the.toggleElement = this;
                _toggle();
            });
        }

        if (closers !== null && closers.length > 0) {
            Util.on(body, closers, 'click', function (e) {
                e.preventDefault();

                the.closeElement = this;
                _hide();
            });
        }
    }

    var _toggle = function () {
        if (EventHandler.trigger(the.element, 'kt.drawer.toggle', the) === false) {
            return;
        }

        if (the.shown === true) {
            _hide();
        } else {
            _show();
        }

        EventHandler.trigger(the.element, 'kt.drawer.toggled', the);
    }

    var _hide = function () {
        if (EventHandler.trigger(the.element, 'kt.drawer.hide', the) === false) {
            return;
        }

        the.shown = false;

        _deleteOverlay();

        body.removeAttribute('data-kt-drawer-' + the.name, 'on');
        body.removeAttribute('data-kt-drawer');

        Util.removeClass(the.element, the.options.baseClass + '-on');

        if (the.toggleElement !== null) {
            Util.removeClass(the.toggleElement, 'active');
        }

        EventHandler.trigger(the.element, 'kt.drawer.after.hidden', the) === false
    }

    var _show = function () {
        if (EventHandler.trigger(the.element, 'kt.drawer.show', the) === false) {
            return;
        }

        the.shown = true;

        _createOverlay();
        body.setAttribute('data-kt-drawer-' + the.name, 'on');
        body.setAttribute('data-kt-drawer', 'on');

        Util.addClass(the.element, the.options.baseClass + '-on');

        if (the.toggleElement !== null) {
            Util.addClass(the.toggleElement, 'active');
        }

        EventHandler.trigger(the.element, 'kt.drawer.shown', the);
    }

    var _update = function () {
        var width = _getWidth();
        var direction = _getOption('direction');

        // Reset state
        if (Util.hasClass(the.element, the.options.baseClass + '-on') === true && String(body.getAttribute('data-kt-drawer-' + the.name + '-')) === 'on') {
            the.shown = true;
        } else {
            the.shown = false;
        }

        // Activate/deactivate
        if (_getOption('activate') === true) {
            Util.addClass(the.element, the.options.baseClass);
            Util.addClass(the.element, the.options.baseClass + '-' + direction);
            Util.css(the.element, 'width', width, true);

            the.lastWidth = width;
        } else {
            Util.css(the.element, 'width', '');

            Util.removeClass(the.element, the.options.baseClass);
            Util.removeClass(the.element, the.options.baseClass + '-' + direction);

            _hide();
        }
    }

    var _createOverlay = function () {
        if (_getOption('overlay') === true) {
            the.overlayElement = document.createElement('DIV');

            Util.css(the.overlayElement, 'z-index', Util.css(the.element, 'z-index') - 1); // update

            body.append(the.overlayElement);

            Util.addClass(the.overlayElement, _getOption('overlay-class'));

            Util.addEvent(the.overlayElement, 'click', function (e) {
                e.preventDefault();
                _hide();
            });
        }
    }

    var _deleteOverlay = function () {
        if (the.overlayElement !== null) {
            Util.remove(the.overlayElement);
        }
    }

    var _getOption = function (name) {
        if (the.element.hasAttribute('data-kt-drawer-' + name) === true) {
            var attr = the.element.getAttribute('data-kt-drawer-' + name);
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

    var _getWidth = function () {
        var width = _getOption('width');

        if (width === 'auto') {
            width = Util.css(the.element, 'width');
        }

        return width;
    }

    var _destroy = function () {
        Util.data(the.element).remove('drawer');
    }

    // Construct class
    _construct();

    ///////////////////////
    // ** Public API  ** //
    ///////////////////////

    // Plugin API
    the.toggle = function () {
        return _toggle();
    }

    the.show = function () {
        return _show();
    }

    the.hide = function () {
        return _hide();
    }

    the.isShown = function () {
        return the.shown;
    }

    the.update = function () {
        _update();
    }

    the.goElement = function () {
        return the.element;
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
Drawer.getInstance = function (element) {
    if (element !== null && Util.data(element).has('drawer')) {
        return Util.data(element).get('drawer');
    } else {
        return null;
    }
}

// Hide all drawers and skip one if provided
Drawer.hideAll = function (skip = null, selector = '[data-controller="components--drawer"]') {
    var items = document.querySelectorAll(selector);

    if (items && items.length > 0) {
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var drawer = Drawer.getInstance(item);

            if (!drawer) {
                continue;
            }

            if (skip) {
                if (item !== skip) {
                    drawer.hide();
                }
            } else {
                drawer.hide();
            }
        }
    }
}

// Update all drawers
Drawer.updateAll = function (selector = '[data-controller="components--drawer"]') {
    var items = document.querySelectorAll(selector);

    if (items && items.length > 0) {
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var drawer = Drawer.getInstance(item);

            if (drawer) {
                drawer.update();
                ;
            }
        }
    }
}

// Global Handlers
Drawer.initGlobalHandlers = function () {
    // Window resize Handling
    window.addEventListener('resize', Drawer.resize)
}

Drawer.resize = function () {
    console.log('resize')
    var timer;
    var body = document.getElementsByTagName("BODY")[0];

    Util.throttle(timer, function () {
        // Locate and update drawer instances on window resize
        var elements = body.querySelectorAll('[data-controller="components--drawer"]');

        if (elements && elements.length > 0) {
            for (let i = 0, len = elements.length; i < len; i++) {
                let drawer = Drawer.getInstance(elements[i]);
                if (drawer) {
                    drawer.update();
                }
            }
        }
    }, 200);
}

// Create instances
Drawer.createInstances = function (selector = '[data-controller="components--drawer"]') {
    var body = document.getElementsByTagName("BODY")[0];

    // Initialize Menus
    var elements = body.querySelectorAll(selector);
    var drawer;

    if (elements && elements.length > 0) {
        for (var i = 0, len = elements.length; i < len; i++) {
            let instance = Drawer.getInstance(elements[i])
            if (!instance) {
                drawer = new Drawer(elements[i]);
            }
        }
    }
}

// Toggle instances
Drawer.handleShow = function () {
    // External drawer toggle handler
    Util.on(document.body, '[data-kt-drawer-show="true"][data-kt-drawer-target]', 'click', function (e) {
        let element = document.querySelector(this.getAttribute('data-kt-drawer-target'));

        if (element) {
            Drawer.getInstance(element).show();
        }
    });
}

// Dismiss instances
Drawer.handleDismiss = function () {
    // External drawer toggle handler
    Util.on(document.body, '[data-kt-drawer-dismiss="true"]', 'click', function (e) {
        var element = this.closest('[data-controller="components--drawer"]');

        if (element) {
            var drawer = Drawer.getInstance(element);
            if (drawer.isShown()) {
                drawer.hide();
            }
        }
    });
}


// Global initialization
Drawer.bootstrap = () => {
    Drawer.initGlobalHandlers()
    Drawer.createInstances();
    Drawer.handleShow();
    Drawer.handleDismiss();
}

Drawer.reinitialization = () => {
    Drawer.createInstances();
    Drawer.handleShow();
    Drawer.handleDismiss();
}

export {
    Drawer
}
