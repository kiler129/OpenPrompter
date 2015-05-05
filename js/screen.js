var Screen = function(parent, targetId) {
    this.prompter = parent || this.prompter;

    targetId = targetId || 'screen';
    this.target = $('#' + targetId);
    if(typeof this.target === 'undefined') {
        throw 'Screen init on #' + targetId + ' failed - no such object';
    }

    this.defaults = {
        flip: false,
        background: '#000'
    };

    //Import settings
    if(typeof this.prompter.settings.screen === 'undefined') {
        this.prompter.settings.screen = {};
    }
    this.prompter.settings.screen = $.extend(true, this.defaults, this.prompter.settings.screen);
    this.settings = this.prompter.settings.screen;

    $(this.target).css('background', this.settings.background);
    if(this.settings.flip) { this._enableFlip(); }

    console.log("Screen initialized");
};

Screen.prototype._enableFlip = function() {
    this.settings.flip = true;

    $('*', this.target).each(function() {
        $(this).addClass('flip');
    });
};

Screen.prototype._disableFlip = function() {
    this.settings.flip = false;

    $('*', this.target).each(function() {
        $(this).removeClass('flip');
    });
};

Screen.prototype.toggleFlip = function() {
    if(this.settings.flip) {
        this._disableFlip();
    } else {
        this._enableFlip();
    }

    document.dispatchEvent(new Event('app.save_state'));
};