'use strict';

let fieldset = document.getElementById('interests');

chrome.storage.sync.get('interests', function(data) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://chrome.grayfolk.net/api/interests', true);
	xhr.responseType = 'json';

	xhr.onload = function(e) {
		this.response.forEach((element) => {
			let checked = data.interests.indexOf(element.id.toString()) !== -1 ? ' checked' : '';
			fieldset.insertAdjacentHTML('beforeend', '<label> <input type="checkbox" name="interests[]" value="' + element.id + '"' + checked + '> ' + element.title + ' </label>')
		})
	};

	xhr.send();
});

let saveBtn = document.getElementById('saveBtn');

saveBtn.onclick = function(element) {
	let interests = [];
	
	document.getElementsByName('interests[]').forEach(element => element.checked ? interests.push(element.value) : '');
	chrome.storage.sync.set({
		interests : interests
	});
	
	window.close();
};
