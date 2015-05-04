var Prompter = function() {
	var defaultText = "Welcome to OpenPrompter!\n\nHave you ever thought how news station presenters memorize all that information? Well, they don't - it's just teleprompter magic.\n\nTelemprompter is a device displaying scrolling text, read by someone in front of camera. Typicaly teleprompters are specialized, and rather expensive devices used by pros, but any tablet and piece of glass works as well.\nThe only missing part is application - simple, reliable, and of course free. That's why OpenPromtper born - use it anytime and anywhere.\n\nRemember to adjust speed and sizes to your needs. You can also change colors.";
	
	console.log('Checking browser...');
	if(typeof(Storage) === 'undefined') throw 'No HTML5 storage support detected - update browser to continue';
	if(typeof(JSON) === 'undefined') throw 'No native JSON support detected - update browser to continue';
	
	
	console.log('Initializing storage');
	this.settings = (localStorage.getItem('prompter') !== null) ? JSON.parse(localStorage.prompter) : {};
	if(typeof this.settings.text === 'undefined') {
		this.settings.text = defaultText;
	}

	console.log('Initializing modules');
	this.textarea = new Textarea(this);
}

Prompter.prototype.saveState = function() {
	localStorage.setItem('prompter', JSON.stringify(this.settings));
}


$(function() {
	console.log('** Starting application **');
	var globalLoader = new Loader('loading');
	
		console.log(localStorage.prompter);

	try {
		Prompter = new Prompter();
		Prompter.textarea.loadText(Prompter.settings.text); //Load last text
				
	} catch(err) {
		globalLoader.destroy();
		new FatalModal('Application error', err.message);
	}
	console.log(localStorage.prompter);

	Prompter.saveState();
		console.log(localStorage.prompter);

	console.log("** Application ready **");
	globalLoader.stop();
	
	//Menu controls
	$(".flipTrigger").click(function(){
		Prompter.textarea.toggleFlip();
	});
});

