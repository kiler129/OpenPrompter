var Prompter = Prompter || {};

$(function(){
	var globalLoader = new Loader('loading');
	
	if(typeof(Storage) === 'undefined') {
		globalLoader.destroy();
		new FatalModal('Application error', 'No HTML5 storage support detected - update browser to continue');
		return;
	}
	
	if(typeof Storage.prompter === 'undefined') {
		Storage.prompter = {};
	}
	
	Prompter.settings = new Settings();
	Prompter.textarea = new Textarea();
	
	globalLoader.stop();
	console.log("** Application ready **");
	
	Prompter.textarea.loadText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus, risus eget ullamcorper suscipit, lectus magna laoreet sapien, sed ornare nulla est ac augue. Fusce mattis sagittis sapien congue mollis. Donec magna ligula, porta in nisl eleifend, imperdiet tincidunt arcu. Morbi scelerisque libero non risus vehicula, et maximus lacus venenatis. Vestibulum venenatis a metus at feugiat. In faucibus neque vulputate, mattis ligula at, varius dui. Donec in malesuada neque. Curabitur lobortis laoreet tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur sit amet suscipit dui, a vestibulum tellus. Proin id viverra ipsum, consectetur aliquam odio. Donec facilisis, libero nec dapibus pulvinar, leo nulla varius elit, nec efficitur odio est vitae lacus. Donec turpis nibh, pellentesque eget maximus feugiat, suscipit non urna. Nulla facilisi.');
});

