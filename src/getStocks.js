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

	console.log("Close: " + close);
	console.log("High: " + high);
	console.log("Low: " + low);
}