/* mightygumballJSONP2.js */
/*
 * get the content of a JSON file using JSONP
 * refresh with refresh button
 *   - version 1 just adds <script> elements
 *   - version 2 replaces the <script> element
 *
 */
var lastReportTime = 0;

window.onload = init;

function init() {
	var button = document.getElementById("refresh");
	refresh.onclick = handleRefresh;
}

function handleRefreshv1() {
	var url = "http://gumball.wickedlysmart.com" +
				"?callback=updateSales" +
				"&random=" + (new Date()).getTime();
	var newScript = document.createElement("script");
	newScript.setAttribute("src", url);
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(newScript, head);
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
		salesDiv.appendChild(div);
	}
	if (sales.length > 0) {
		lastReportTime = sales[sales.length-1].time;
	}
}
