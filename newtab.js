"use strict";

let fieldset = document.getElementById('interests');

function getNews() {
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
}

getNews();

$('#interestsModal').on('shown.bs.modal', function (e) {
	chrome.storage.sync.get('interests', function(data) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://chrome.grayfolk.net/api/interests', true);
		xhr.responseType = 'json';
	
		xhr.onload = function(e) {
			fieldset.innerHTML = '';
			this.response.forEach((element) => {
				let checked = data.interests.indexOf(element.id.toString()) !== -1 ? ' checked' : '';
				fieldset.insertAdjacentHTML('beforeend', '<label> <input type="checkbox" name="interests[]" value="' + element.id + '"' + checked + '> ' + element.title + ' </label>')
			})
		};
	
		xhr.send();
		
		let saveBtn = document.getElementById('saveBtn');
	
		saveBtn.onclick = function(element) {
			let interests = [];
			
			document.getElementsByName('interests[]').forEach(element => element.checked ? interests.push(element.value) : '');
			chrome.storage.sync.set({
				interests : interests
			});
			
			$('#interestsModal').modal('hide')
			getNews();
		};
	});
})
