var Screen = function (settings, targetId) {
    targetId = targetId || 'screen';

    this.target = $('#' + targetId);
    if (typeof this.target === 'undefined') {
        throw 'Screen init on #' + targetId + ' failed - no such object';
    }

    this.settings = settings.extend('screen', {
        flip: false,
        background: '#000'
    });


    $(this.target).css('background', this.settings.background);
    if (this.settings.flip) {
        this._enableFlip();
    }

    console.log("Screen initialized");
};

Screen.prototype._enableFlip = function () {
    this.settings.flip = true;

    $('*', this.target).each(function () {
        $(this).addClass('flip');
    });

    document.dispatchEvent(new Event('settings.persist'));
};

Screen.prototype._disableFlip = function () {
    this.settings.flip = false;

    $('*', this.target).each(function () {
        $(this).removeClass('flip');
    });

    document.dispatchEvent(new Event('settings.persist'));
};

Screen.prototype.toggleFlip = function () {
    if (this.settings.flip) {
        this._disableFlip();
    } else {
        this._enableFlip();
    }
};