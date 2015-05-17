var Menus = function (settings, prompter, targetId) {
    targetId = targetId || 'menu';
    this.target = document.getElementById(targetId);

    this.settings = settings.extend('menus', {
        enableAutoHide: true,
        autoHideTime: 2000
    });

    this.autoHideTimer = false;

    this._initAutoHide(prompter);

    console.log("Menus initialized");
};

Menus.prototype._initAutoHide = function (prompter) {
    var _self = this;

    $(prompter.textarea.target).on('touchstart click', {prompter: prompter}, function (e) {
        _self.show();

        if (_self.settings.enableAutoHide && e.data.prompter.textarea.isRunning) {
            _self.autoHide(true);
        }
    });

    document.addEventListener('textarea.start', function () {
        if (_self.settings.enableAutoHide) {
            _self.autoHide(true);
            _self.hide();
        }
    });

    var onStop = function () {
        _self.show();

        if (_self.settings.enableAutoHide) {
            _self.autoHide(false);
            _self.show();
        }
    };
    document.addEventListener('textarea.stop', onStop);
    document.addEventListener('textarea.pause', onStop);
};

Menus.prototype.autoHide = function (state) {
    clearTimeout(this.autoHideTimer);

    var _self = this;
    if (typeof state !== 'undefined' && state) {
        console.log("Menu: enabling autohide");

        this.autoHideTimer = setTimeout(function () {
            _self.hide();
        }, this.settings.autoHideTime);
    }
};

Menus.prototype.hide = function () {
    $(this.target).addClass('hidden');
};

Menus.prototype.show = function () {
    $(this.target).removeClass('hidden');
};

Menus.prototype.toggle = function () {
    $(this.target).toggleClass('hidden');
};
