var Menus = function (settings, prompter, targetId) {
    targetId = targetId || 'menu';
    this.target = document.getElementById(targetId);

    this.settings = settings.extend('menus', {
        enableAutoHide: true,
        autoHideTime: 2000
    });

    this.autoHideTimer = false;

    this._initAutoHide(prompter);
    this._setupActions(prompter);

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

Menus.prototype._setupActions = function (prompter) {
    $(this.target).on('click', '*[data-action="loadFile"]', {prompter: prompter}, function (e) {
        e.data.prompter.fileLoader.triggerDialog();
    });

    $(this.target).on('click', '*[data-action="startPrompter"]', {_self: this, prompter: prompter}, function (e) {
        e.data.prompter.textarea.start();
        console.log(e.data._self.target);


        $('*[data-action="pausePrompter"]', e.data._self.target).removeClass('hide');
        $('*[data-action="startPrompter"]', e.data._self.target).addClass('hide');
    });

    $(this.target).on('click', '*[data-action="pausePrompter"]', {_self: this, prompter: prompter}, function (e) {
        e.data.prompter.textarea.pause();
        $('*[data-action="startPrompter"]', e.data._self.target).removeClass('hide');
        $('*[data-action="pausePrompter"]', e.data._self.target).addClass('hide');
    });

    $(this.target).on('click', '*[data-action="stopPrompter"]', {_self: this, prompter: prompter}, function (e) {
        e.data.prompter.textarea.stop();
        $('*[data-action="startPrompter"]', e.data._self.target).removeClass('hide');
        $('*[data-action="pausePrompter"]', e.data._self.target).addClass('hide');
    });

    $('*[data-action="setScrollingSpeed"]', this.target).val(prompter.textarea.settings.speedFactor);
    $(this.target).on('input', '*[data-action="setScrollingSpeed"]', {_self: this, prompter: prompter}, function (e) {
        var value = $(this).val();
        $('*[data-action="setScrollingSpeed"]', e.data._self.target).val(value);
        prompter.textarea.changeSpeedFactor(value);
    });
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
