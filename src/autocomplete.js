function updateSuggestions() {
	var q = document.getElementById("searchBar").value;
	console.log(q);
	closeAllLists();
	var a = document.getElementById("autocomplete-list");
	getSearches(q, a);
}

function closeAllLists() {
	document.getElementById("autocomplete-list").innerHTML = "";
	// var x = document.getElementsByClassName("autocomplete-items");
	// for (var i = 0; i < x.length; i++) {
	// 	if (elmnt != x[i]) {
	// 		x[i].parentNode.removeChild(x[i]);
	// 	}
	// }
}

function getSearches(searchVal, a) {
	var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + searchVal + '&apikey=KYJ63OHXTZUJ9Q4I'

	fetch(url)
	.then((resp) => resp.json())
	.then(function(data) {
		var i;
		console.log(data);
		for(i = 0; i < data.bestMatches.length; i++){
			console.log(data.bestMatches[i]["2. name"]);
			var b = document.createElement("DIV");
			b.innerHTML += data.bestMatches[i]["2. name"];
			b.innerHTML += "<input type='hidden' value='" + data.bestMatches[i]["2. name"] + "'>";
			b.setAttribute("class", "autocomplete-items");
			b.addEventListener("click", function(e) {
				/*insert the value for the autocomplete text field:*/
				document.getElementById("searchBar").value = this.getElementsByTagName("input")[0].value;
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
			});
			a.appendChild(b);
		}
	})
}