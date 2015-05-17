var Modal = function (content, type, opts) {
    if (typeof type === 'undefined') {
        type = 'default';
    }

    if (typeof opts === 'undefined') {
        var opts = {};
    }

    this.element = $('<div/>')
        .attr('class', 'modal-' + type)
        .html(content)
        .appendTo($('body'));
    this.element.easyModal(opts);
    this.show();
};

Modal.prototype.changeText = function (text) {
    $(this.element).html(text);
};

Modal.prototype.show = function () {
    this.element.trigger('openModal');
};

Modal.prototype.hide = function () {
    this.element.trigger('closeModal');
};

Modal.prototype.destroy = function () {
    this.hide();
    $(this.element).remove();
};


var FatalModal = function (title, content) {
    var opts = {
        overlayClose: false,
        closeOnEscape: false
    };

    var text = '<h1>' + title + '</h1>' + content;
    Modal.apply(this, [text, 'fatal', opts]);

};
FatalModal.prototype = Modal.prototype;
FatalModal.prototype.constructor = FatalModal;
