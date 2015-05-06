var Textarea = function (settings, targetId) {
    this.prompter = parent || this.prompter;
    var _self = this;

    targetId = targetId || 'textarea';
    this.target = document.getElementById(targetId);

    this.settings = settings.extend('textarea', {
        speedFactor: 7000, //It's actually value of miliseconds needed to scroll whole screen
    });

    //Stop on user interaction
    $(this.target).on('touchstart', function () {
        _self.pause();
    });

    console.log("Textarea initialized");
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

Textarea.prototype.start = function () {
    this.pause();

    $(this.target).animate(
        {
            scrollTop: this.target.scrollHeight
        },
        this._getScrollTime(),
        'linear'
    );
};

Textarea.prototype.pause = function () {
    $(this.target).stop(true);
}

Textarea.prototype.stop = function () {
    this.pause();
    $(this.target).animate({scrollTop: 0}, 0);
}
