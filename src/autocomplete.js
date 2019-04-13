function updateSuggestions() {
	var q = document.getElementById("searchBar").value;

}

function closeAllLists(elmnt) {
	/*close all autocomplete lists in the document,
	except the one passed as an argument:*/
	var x = document.getElementsByClassName("autocomplete-items");
	for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i]) {
			x[i].parentNode.removeChild(x[i]);
		}
	}
}

function autocomplete(inp) {

	var currentFocus;
	inp.addEventListener("input", function(e){
		var a, b, i, searchVal = this.value;

		closeAllLists();
		if(!searchVal){return false;}
		currentFocus = -1;

		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		
		getSearches(searchVal);
	});
}

function getSearches(searchVal){
	var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + searchVal + '&apikey=KYJ63OHXTZUJ9Q4I'

	fetch(url)
	.then((resp) => resp.json())
	.then(function(data) {
		var i;
		console.log(data);

		for(i = 0; i < data.bestMatches.length; i++){
			console.log(data.bestMatches[i]["2. name"]);
		}
	})
}
