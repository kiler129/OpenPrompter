var FileLoader = function (settings, callback) {
    if (typeof(window.FileReader) === 'undefined') {
        throw 'No FileReader support detected - update browser to continue';
    }

    var _self = this;
    this.callback = callback;

    this.settings = settings.extend('file_loader', {});

    this.fileInput = $('<input/>')
        .attr('type', 'file')
        .appendTo($('body'))
        .css({visibility: 'hidden', position: 'absolute', top: '-9999px', left: '-9999px'});


    $(this.fileInput).on('change', function () {
        _self._fileChanged();
    });

    console.log("FileLoader initialized");
};

FileLoader.prototype._fileChanged = function () {
    var _self = this;
    var file = $(this.fileInput).get(0).files[0];

    if (file.type.match(/text.*/)) {
        var reader = new FileReader();

        reader.onload = function (e) {
            _self.callback(reader.result);
        };

        reader.readAsText(file);

    } else {
        alert('File not supported ;<');
    }
};

FileLoader.prototype.triggerDialog = function () {
    $(this.fileInput).click();
};
