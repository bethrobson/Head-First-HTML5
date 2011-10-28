/* notetoself.js
 * 
 * This version of notetoself uses a more efficient
 * way of creating new elements to demonstrate how
 * to get better performance from your web pages.
 */

window.onload = init;

function init() {
	var button = document.getElementById("add_button");
	button.onclick = createSticky;

	var stickiesArray = getStickiesArray();
	
	var stickies = document.getElementById("stickies");
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < stickiesArray.length; i++) {
		var key = stickiesArray[i];
		var value = JSON.parse(localStorage[key]);
		addStickyToDOM(key, value, fragment);
	}	
	stickies.appendChild(fragment);
}
function getStickiesArray() {
	var stickiesArray = localStorage.getItem("stickiesArray");
	if (!stickiesArray) {
		stickiesArray = [];
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	} else {
		stickiesArray = JSON.parse(stickiesArray);
	}
	return stickiesArray;
}

function createSticky() {
	var stickiesArray = getStickiesArray();
	var value = document.getElementById("note_text").value;
	var colorSelectObj = document.getElementById("note_color");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;

	// create sticky note using JSON to hold value and color
	var currentDate = new Date();
	var key = "sticky_" + currentDate.getTime();
	var stickyObj = {
			"value": value,
			"color": color
	};
	localStorage.setItem(key, JSON.stringify(stickyObj));

	// add new sticky note key to array and update notes array in localStorage
	stickiesArray.push(key);
	localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	
	var stickies = document.getElementById("stickies");
	var fragment = document.createDocumentFragment();
	addStickyToDOM(key, stickyObj, fragment);
	stickies.appendChild(fragment);
}

function deleteSticky(e) {
	var key = e.target.id;
	if (e.target.tagName.toLowerCase() == "span") {
		key = e.target.parentNode.id;
	}
	var stickiesArray = getStickiesArray();
	if (stickiesArray) {
		for (var i = 0; i < stickiesArray.length; i++) {
			if (key == stickiesArray[i]) {
				stickiesArray.splice(i,1);
			}
		}
		localStorage.removeItem(key);
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
		removeStickyFromDOM(key);
	}
}

function addStickyToDOM(key, stickyObj, fragment) {
	var sticky = document.createElement("li");
	// set the id attribute to the key so we can find it using
	// the ids stored in the stickies array
	sticky.setAttribute("id", key);
	// use the stickyObj color, and set the background-color CSS style
	sticky.style.backgroundColor = stickyObj.color;

	var span = document.createElement("span");
	span.setAttribute("class", "sticky");

	// use the stickyObj value as the text for the sticky note 
	span.innerHTML = stickyObj.value;

	// add everything to the document fragment
	sticky.appendChild(span);
	fragment.appendChild(sticky);

	// add an event listener so when you click on a sticky note it can be deleted
	sticky.onclick = deleteSticky;
}

function removeStickyFromDOM(key) {
	var sticky = document.getElementById(key);
	sticky.parentNode.removeChild(sticky);
}

function clearStickyNotes() {
	localStorage.clear();
	var stickyList = document.getElementById("stickies");
	var stickies = stickyList.childNodes;
	for (var i = stickies.length-1; i >= 0; i--) {
		stickyList.removeChild(stickies[i]);
	}

	// reset stickies array
	var stickiesArray = getStickiesArray();
}

