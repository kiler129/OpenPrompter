var Settings = function() {
	this.textareaProperties = {
		font_size: "10em",
		color: 'white',
		background: "grey",
	};
	
	$.each(this.textareaProperties, function(k, v) {
		k = k.replace('_', '-');
		$('#textarea').css(k, v);
	});
};
