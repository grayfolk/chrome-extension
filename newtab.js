"use strict";

chrome.storage.sync.get('interests', function(data) {
	let query = '';
	
	if(data.interests.length){
		data.interests.forEach(element => query += '&interests[]=' + element);
	}
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://chrome.grayfolk.net/api?' + query, true);
	xhr.responseType = 'json';
	
	xhr.onload = function(e) {
		document.getElementById('title').innerHTML = this.response.title;
		document.getElementById('description').innerHTML = this.response.description;
		document.getElementById('link').setAttribute('href', this.response.link);
		document.getElementById('holder').style.display = 'block';
		document.getElementById('loader').style.display = 'none';
	};
	
	xhr.send();
});
