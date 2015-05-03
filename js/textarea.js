var Textarea = function(targetId) {
	targetId = targetId || 'textarea';
	this.target = document.getElementById(targetId);
	
	if(typeof Prompter.settings.textarea === 'undefined') {
		Prompter.settings.textarea = {};		
	}
	
	this.defaults = {
		flip: false,
		color: '#00ff00',
		speedFactor: 5000, //It's actually value of miliseconds needed to scroll whole screen
		fontSizePx: 80		
	};
	
	
	Prompter.settings.textarea = $.extend(this.defaults, Prompter.settings.textarea);
	this.settings = Prompter.settings.textarea;
	
	this._getScrollTime = function() {		
		var scrollLeft = this.target.scrollHeight - $(this.target).scrollTop(); //Pixels left to scroll
		var height = $(this.target).height();
		var scrollTime = scrollLeft / height * this.settings.speedFactor;
		
		return scrollTime;
	};
	
	console.log("Textarea initialized");
};

Textarea.prototype.toggleFlip = function() {
	this.settings.flip = !this.settings.flip;
	$(this.target).toggleClass('flip');
};

Textarea.prototype.loadText = function(text) {
	this.stop();	
	$(this.target).html(text);
};

Textarea.prototype.start = function() {
	this.pause();
	
	$(this.target).animate(
		{
			scrollTop: $(this.target).get(0).scrollHeight
		},
		this._getScrollTime(),
		'linear'
	);
};

Textarea.prototype.pause = function() {
	$(this.target).stop(true);
}

Textarea.prototype.stop = function() {
	this.pause();
	$(this.target).animate({scrollTop:0}, 0);
}
