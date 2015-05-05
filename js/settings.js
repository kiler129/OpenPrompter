var Settings = function (slug) {
    var _self = this;

    if (typeof(slug) === 'undefined') {
        throw 'No storage name key defined for settings!';
    }

    this.storageKey = slug;

    if (typeof(Storage) === 'undefined') {
        throw 'No HTML5 storage support detected - update browser to continue';
    }

    if (typeof(JSON) === 'undefined') {
        throw 'No native JSON support detected - update browser to continue';
    }

    this.settingsStorage = (localStorage.getItem(this.storageKey) !== null) ? JSON.parse(localStorage[this.storageKey]) : {};


    document.addEventListener('settings.persist', function () {
        console.log('Settings saving state...');
        _self.saveState();
    });

    console.log("Settings initialized");
};

Settings.prototype.saveState = function () {
    localStorage.setItem(this.storageKey, JSON.stringify(this.settingsStorage));
};

Settings.prototype.get = function (name) {
    if (typeof name) {
        throw 'Failed to get item - no name specified!';
    }

    if (typeof this.settingsStorage[name] === 'undefined') {
        this.settingsStorage[name] = {};
    }

    return this.settingsStorage[name];
};

Settings.prototype.extend = function (name, defaults) {
    if (typeof name === 'undefined') {
        throw 'Failed to extend - no name specified!';
    }

    if (typeof defaults === 'undefined') {
        defaults = {};
    }

    if (typeof this.settingsStorage[name] === 'undefined') {
        this.settingsStorage[name] = defaults;
    }
    this.settingsStorage[name] = $.extend(true, defaults, this.settingsStorage[name]);

    return this.settingsStorage[name];
};
