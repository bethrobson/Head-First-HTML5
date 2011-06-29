/* mightygumballJSONP3.js */
/*
 * get the content of a JSON file using JSONP
 * update every N seconds.
 *
 */
var lastReportTime = 0;

window.onload = init;

function init() {
	setInterval(handleRefresh, 3000);
	handleRefresh();
}

function handleRefresh() {
	var url = "http://gumball.wickedlysmart.com" +
				"?callback=updateSales" +
				"&lastreporttime=" + lastReportTime +
				"&random=" + (new Date()).getTime();
	var newScript = document.createElement("script");
	newScript.setAttribute("src", url);
	newScript.setAttribute("id", "jsonp");
	var script = document.getElementById("jsonp");
	if (script == null) {
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(newScript, head);
	}
	else {
		var head = script.parentNode;
		head.replaceChild(newScript, script);
	}
}

function updateSales(sales) {
	var salesDiv = document.getElementById("sales");
	for (var i = 0; i < sales.length; i++) {
		var sale = sales[i];
		var div = document.createElement("div");
		div.setAttribute("class", "saleItem");
		div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
		//salesDiv.appendChild(div);
//
// Enhancement: if you want to insert the new gumball sales
// report at the top of your list instead of the bottom, 
// use insertBefore, as below.
//
		if (salesDiv.childElementCount == 0) {
			salesDiv.appendChild(div);
		}
		else {
			salesDiv.insertBefore(div, salesDiv.firstChild);
		}
	}

	if (sales.length > 0) {
		lastReportTime = sales[sales.length-1].time;
	}
}


