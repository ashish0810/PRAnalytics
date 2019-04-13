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
		for(i = 0; i < bestMatches.length; i++){
			b = document.createElement("DIV");
			b.innerHTML = "<strong>" + bestMatches[i].substr(0, searchVal.length) + "</strong>";
			b.innerHTML += "<input type= 'hidden' value= '" + bestMatches[i] + "'>";

			b.addEventListener("click", function(e){

				inp.value = this.getElementsByTagName("input")[0].value;
				closeAllLists();
			});
			a.appendChild(b);
		}

	});
	inp.addEventListener("keydown", function(e){
		var x = document.getElementById(this.id + "autocomplete-list");
		if(x) x = x.getElementsByTagName("div");
		if(e.keyCode == 40){
			currentFocus++;
			addActive(x);
		}else if(e.keyCode == 38){
			currentFocus--;
			addActive(x);
		}else if(e.keyCode == 13){
			e.preventDefault();
			if(currentFocus > -1){
				if(x) x[currentFocus].click();
			}
		}
	});

	function addActive(x){
		if(!x) return false;
		removeActive(x);
		if(currentFocus >= x.length) currentFocus = 0;
		if(currentFocus < 0) currentFocus = (x.length - 1);
		x[currentFocus].classList.add("autocomplete-active");
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
