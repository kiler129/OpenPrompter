var Library = function() {
	if(typeof Storage.prompter.library === 'undefined') {
		
	};
	
	this.storage = Storage.prompter.library;
	
	console.log("Library initialized");
}

Library.prototype.getText = function(title) {
	if(typeof this.storage[title] === 'undefined') {
		return null;
	}	
};

Library.prototype.addText = function(title, content) {
	if(this.getText(title) !== null) {
		return false;
	}
	
	this.storage[title] = content;
	return true;
};

Library.prototype.removeText = function(title) {
	if(this.getText(title) === null) {
		return false;
	}
	
	delete this.storage[title];
	return true;
};

Library.prototype.listTexts = function() {
	return this.storage;
}
