//
// worker has no access to the DOM
// Can do setTimeout and XMLHttpRequest
// uses the postMessage API
// 
onmessage = pingpong;

function pingpong(event) {
	if (event.data == "ping") {
		postMessage("pong");
	}
	else {
		// intentionally make an error!
		1/x;
	}
}


/*
self.onmessage = function (event) {
	var total = 0;
	for (var i = 0; i < event.data.length; i++) {
		total += event.data[i];
	}
	postMessage(total);
}

self.onmessage = function (event) {
	var string = "";
	var msg = event.data.message;
	var count = event.data.count;

	for (var i = 0; i < count; i++) {
		string += msg + " ";
	}
	postMessage(string);
}
*/
