var Menus = function (settings, prompter, targetId) {
    var _self = this;

    targetId = targetId || 'menu';
    this.target = document.getElementById(targetId);

    this.settings = settings.extend('menus', {
    });

    console.log("Menus initialized");
};

Menus.prototype.hide = function() {
    $(this.target).addClass('hidden');
};

Menus.prototype.show = function() {
    $(this.target).removeClass('hidden');
};

Menus.prototype.toggle = function() {
    $(this.target).toggleClass('hidden');
};
