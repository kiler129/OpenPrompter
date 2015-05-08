var Prompter = function () {
    console.log('Initializing modules');
    this.settingsStorage = new Settings('prompter');
    this.screen = new Screen(this.settingsStorage);
    this.preloader = new Preloader(this.settingsStorage);
    this.textarea = new Textarea(this.settingsStorage);
    this.menus = new Menus(this.settingsStorage, this);

    this.settings = this.settingsStorage.extend('prompter', {
        text: "Welcome to OpenPrompter!\n\nHave you ever thought how news station presenters memorize all that information? Well, they don't - it's just teleprompter magic.\n\nTelemprompter is a device displaying scrolling text, read by someone in front of camera. Typicaly teleprompters are specialized, and rather expensive devices used by pros, but any tablet and piece of glass works as well.\nThe only missing part is application - simple, reliable, and of course free. That's why OpenPromtper born - use it anytime and anywhere.\n\nRemember to adjust speed and sizes to your needs. You can also change colors.",
        preloader: true
    });
};

Prompter.prototype.start = function() {
    var _self = this;

    if(this.settings.preloader) {
        this.preloader.start(function() {
           _self.textarea.start();
        });

    } else {
        this.textarea.start();
    }
};

$(function () {
    console.log('** Starting application **');
    var globalLoader = new Loader('loading');

    try {
        Prompter = new Prompter();
        Prompter.textarea.loadText(Prompter.settings.text); //Load last text

    } catch (err) {
        globalLoader.destroy();
        new FatalModal('Application error', err.message);
    }

    console.log("** Application ready **");
    globalLoader.stop();

    //Menu controls
    $(".flipTrigger").click(function () {
        Prompter.screen.toggleFlip();
    });
});

