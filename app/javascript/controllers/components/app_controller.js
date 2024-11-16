import {Controller} from "@hotwired/stimulus"
import {Drawer, Menu, Scroll, Sticky, Swapper} from "../../src/components";
import {App, LayoutAside, LayoutSearch, LayoutToolbar} from "../../src/layout";

// Connects to data-controller="components--app"
export default class extends Controller {

    initialize() {
        this._initComponents();
        this._initLayout()
    }

    // private

    _initComponents() {
        this._drawerInit()
        this._menuInit()
        this._scrollInit()
        this._stickyInit()
        this._swapperInit()
    }

    _initLayout() {
        this._appInit()
        this._asideInit()
        this._searchInit()
        this._toolbarInit()
    }

    _drawerInit() {
        Drawer.initGlobalHandlers()
        Drawer.handleShow();
        Drawer.handleDismiss();
    }

    _menuInit() {
        Menu.initGlobalHandlers()
    }

    _scrollInit() {
        Scroll.initGlobalHandlers();
    }

    _stickyInit() {
        Sticky.initGlobalHandlers()
    }

    _swapperInit() {
        Swapper.initGlobalHandlers();
    }

    _appInit() {
        App.init();
    }

    _asideInit() {
        LayoutAside.init()
    }

    _searchInit() {
        LayoutSearch.init()
    }

    _toolbarInit() {
        LayoutToolbar.init()
    }

}
