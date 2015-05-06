var Preloader = function (settings, targetId) {
    this.prompter = parent || this.prompter;

    targetId = targetId || 'preloader';
    this.target = document.getElementById(targetId);
    this.textTarget = $('<div/>')
        .addClass('preloaderTextTarget')
        .appendTo(this.target);

    this.settings = settings.extend('preloader', {
        time: 1000,
        count: 5
    });

    this.iterationsLeft = 0;
    this.timer = null;
    this.callback = null;

    console.log("Preloader initialized");
};

Preloader.prototype._initSpinner = function () {
    var spinnerOpts = {
        lines: 17, // The number of lines to draw
        length: 0, // The length of each line
        width: Math.round($(this.target).height() / 20), // The line thickness
        radius: Math.round($(this.target).height() / 2.5), // The radius of the inner circle
        corners: 0, // Corner roundness (0..1)
        rotate: -90, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#fff', // #rgb or #rrggbb or array of colors
        speed: this.settings.time / 1000, // Rounds per second
        trail: 0, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };

    this.spinner = new Spinner(spinnerOpts).spin(this.target);
};

Preloader.prototype._updateCounter = function () {
    console.log('Preloader iteration ' + this.iterationsLeft);
    if (this.iterationsLeft === 0) {
        this.abort();
        this.callback();
        return;
    }

    $(this.textTarget).html(this.iterationsLeft);
    this.iterationsLeft--;

    var _self = this;
    this.timer = setTimeout(function () {
        _self._updateCounter();
    }, _self.settings.time);
    console.log('Preloader timer registered at ' + this.timer);
};

Preloader.prototype.abort = function () {
    clearTimeout(this.timer);

    if (typeof this.spinner !== 'undefined') {
        this.spinner.stop();
    }

    $(this.target).hide(0);
};

Preloader.prototype.start = function (callback) {
    console.log('Starting preloader');
    this.abort(this.timer);
    this.callback = callback;

    $(this.target).show(0);
    $(this.textTarget).css('font-size', Math.round($(this.target).height() * 0.9) + 'px');
    this.iterationsLeft = this.settings.count;
    this._updateCounter();
    this._initSpinner();
};
