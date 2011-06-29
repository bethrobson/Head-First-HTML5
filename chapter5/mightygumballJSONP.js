/* mightygumballJSONP.js */
/*
 * get the content of a JSON file using JSONP, version 1
 *
 */

window.onload = init;
function init() {
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
}

