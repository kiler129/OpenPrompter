var Textarea = function (settings, targetId) {
    var _self = this;

    targetId = targetId || 'textarea';
    this.target = document.getElementById(targetId);

    this.settings = settings.extend('textarea', {
        speedFactor: 7000, //It's actually value of miliseconds needed to scroll whole screen
        speedFactorTimeout: 1000 //Prevents saving speedFactor too often on rapid change. If this valus is set to 1000ms settings are saved no more than once a second.
    });
    this.speedFactorSaveDelayTimer = null;

    //Stop on user interaction
    $(this.target).on('swipe', function () {
        _self.pause();
    });

    this.isRunning = false;
    this._isRunningInit();

    console.log("Textarea initialized");
};

Textarea.prototype._isRunningInit = function () {
    var _self = this;

    document.addEventListener('textarea.start', function () {
        _self.isRunning = true;
    });

    document.addEventListener('textarea.pause', function () {
        _self.isRunning = false;
    });

    document.addEventListener('textarea.stop', function () {
        _self.isRunning = false;
    });
};

Textarea.prototype._getScrollTime = function () {
    var scrollLeft = this.target.scrollHeight - $(this.target).scrollTop(); //Pixels left to scroll
    var height = $(this.target).height();

    return (scrollLeft / height * this.settings.speedFactor);
};

Textarea.prototype.loadText = function (text) {
    this.stop();
    text = text.replace(new RegExp('\r?\n', 'g'), '<br>');

    $(this.target).html(text);
};

Textarea.prototype._setupAnimation = function () {
    $(this.target).animate(
        {
            scrollTop: this.target.scrollHeight - $(this.target).height()
        },
        this._getScrollTime(),
        'linear',
        this._finishAnimation
    );
};

Textarea.prototype._finishAnimation = function () {
    document.dispatchEvent(new Event('textarea.stop'));
};

Textarea.prototype._stopAnimation = function () {
    $(this.target).stop(true);
};

Textarea.prototype.start = function () {
    this.pause();
    this._setupAnimation();
    document.dispatchEvent(new Event('textarea.start'));
};

Textarea.prototype.pause = function () {
    this._stopAnimation();
    document.dispatchEvent(new Event('textarea.pause'));
};

Textarea.prototype.stop = function () {
    this._stopAnimation();
    $(this.target).animate({scrollTop: 0}, 0);

    document.dispatchEvent(new Event('textarea.stop'));
};

Textarea.prototype.changeSpeedFactor = function (speedFactor) {
    clearTimeout(this.speedFactorSaveDelayTimer);

    this.settings.speedFactor = speedFactor;

    if (this.isRunning) {
        this._stopAnimation();
        this._setupAnimation();
    }

    this.speedFactorSaveDelayTimer = setTimeout(function () {
        document.dispatchEvent(new Event('settings.persist'));
    }, this.settings.speedFactorTimeout);
};
