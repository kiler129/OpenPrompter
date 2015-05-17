var Loader = function (targetName) {
    var spinJsOpts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#ffffff', // #rgb or #rrggbb or array of colors
        speed: 0.6, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };

    this.target = document.getElementById(((typeof targetName === 'undefined') ? targetName : 'loading'));
    this.spinner = new Spinner(spinJsOpts).spin(this.target);

    console.log("Loader initialized");
};

Loader.prototype.stop = function () {
    this.spinner.stop();
};

Loader.prototype.start = function () {
    this.spinner.spin();
};

Loader.prototype.destroy = function () {
    this.stop();
    $(this.target).remove();
};
