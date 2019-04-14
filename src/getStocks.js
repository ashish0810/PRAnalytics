function getStocks(symbol){

	encodeURIComponent();
	var url = 'https://cloud.iexapis.com/beta/stock/' + symbol + '/ohlc/?token=sk_3cce5dbee09d45debd5a1728acaf89e2';
	var httpRequest = new XMLHttpRequest();
	var resp, close, high, low;

	httpRequest.open("GET", url, false);
	httpRequest.send();
	resp = JSON.parse(httpRequest.responseText);

	close = resp["close"]["price"];
	high = resp["high"];
	low = resp["low"];

	displayStock(close, high, low)
}

function displayStock(close, high, low){
	document.getElementById("stockWrapper").innerHTML = "<h3 style= color: white; margin: 0; padding: 0;>Closing Price: $" + close + 
		"</h3><h3 style= color: green; margin: 0; padding: 0;>High: $" + high + 
			"</h3><h3 style= color: red; margin: 0; padding: 0;>Low: $" + low + "</h3>";
}