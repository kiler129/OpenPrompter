var Textarea = function(targetId) {
	var _self = this;

	targetId = targetId || 'textarea';
	this.target = document.getElementById(targetId);
	
	if(typeof Prompter.settings.textarea === 'undefined') {
		Prompter.settings.textarea = {};		
	}
	
	this.defaults = {
		flip: false,
		color: '#00ff00',
		speedFactor: 8000, //It's actually value of miliseconds needed to scroll whole screen
		fontSizePx: 100,
		lineHeight: 2
	};
	
	//Import settings
	Prompter.settings.textarea = $.extend(this.defaults, Prompter.settings.textarea);
	this.settings = Prompter.settings.textarea;
	
	//Setting textarea styles
	$(this.target).css({
		'background': this.settings.background,
		'color': this.settings.color,
		'font-size': this.settings.fontSizePx + 'px',
		'line-height': this.settings.fontSizePx * this.settings.lineHeight + 'px'
	});
	if(this.settings.flip) { $(this.target).addClass('flip'); }
	
	//Stop on user interaction
	$(this.target).on('touchstart', function() {
		_self.pause();
	});
	
	console.log("Textarea initialized");
};
	
Textarea.prototype._getScrollTime = function() {		
	var scrollLeft = this.target.scrollHeight - $(this.target).scrollTop(); //Pixels left to scroll
	var height = $(this.target).height();
	var scrollTime = scrollLeft / height * this.settings.speedFactor;
	
	return scrollTime;
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
			scrollTop: this.target.scrollHeight
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
