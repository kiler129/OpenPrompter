var Prompter = Prompter || {};

$(function(){
	var globalLoader = new Loader('loading');
	
	if(typeof(Storage) === 'undefined') {
		globalLoader.destroy();
		new FatalModal('Application error', 'No HTML5 storage support detected - update browser to continue');
		return;
	}
	
	if(typeof Storage.prompter === 'undefined') {
		Storage.prompter = {
			text: "Welcome to OpenPrompter!\n\nHave you ever thought how news station presenters memorize all that information? Well, they don't - it's just teleprompter magic.\n\nTelemprompter is a device displaying scrolling text, read by someone in front of camera. Typicaly teleprompters are specialized, and rather expensive devices used by pros, but any tablet and piece of glass works as well.\nThe only missing part is application - simple, reliable, and of course free. That's why OpenPromtper born - use it anytime and anywhere.\n\nRemember to adjust speed and sizes to your needs. You can also change colors."
		};
	}
	
	Prompter.settings = Storage.prompter;
	Prompter.textarea = new Textarea();
	
	globalLoader.stop();
	console.log("** Application ready **");
	
	Prompter.textarea.loadText(Prompter.settings.text); //Load last text
	
	//Menu controls
	
});

