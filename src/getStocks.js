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

	displayStock(symbol, close, high, low)
}

function displayStock(ticker, close, high, low){
	document.getElementById("stockWrapper").innerHTML = "<button type='button' class='btn btn-default navbar-btn' data-toggle='popover_stock' data-placement='left' data-trigger='focus' title='Stock info' data-content='Closing Price: $" + close + "\n\nHigh: $" + high + "\n\nLow: $" + low + "'>" + ticker + " Stock Info</button>";
	$('[data-toggle="popover_stock"]').popover();
}