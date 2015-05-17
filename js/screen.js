var Screen = function (settings, targetId) {
    targetId = targetId || 'screen';

    this.target = $('#' + targetId);
    if (typeof this.target === 'undefined') {
        throw 'Screen init on #' + targetId + ' failed - no such object';
    }

    this.settings = settings.extend('screen', {
        flip: false,
        background: '#000',
        color: '#00ff00',
        fontSizePx: 100,
        lineHeight: 1.8
    });

    //Setting textarea styles
    $(this.target).css({
        'background': this.settings.background,
        'color': this.settings.color,
        'font-size': this.settings.fontSizePx + 'px',
        'line-height': this.settings.fontSizePx * this.settings.lineHeight + 'px'
    });


    $(this.target).css('background', this.settings.background);
    if (this.settings.flip) {
        this._enableFlip();
    }

    console.log("Screen initialized");
};

Screen.prototype._enableFlip = function () {
    this.settings.flip = true;

    $(this.target).children().each(function () {
        $(this).addClass('flip');
    });

    document.dispatchEvent(new Event('settings.persist'));
};

Screen.prototype._disableFlip = function () {
    this.settings.flip = false;

    $(this.target).children().each(function () {
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
