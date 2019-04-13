function runAnalysis() {

}

function getNews(companyName) {
	var url = 'https://newsapi.org/v2/top-headlines?q=' + companyName + '&apiKey=124a2a2d87434a7abdb39858a824ef8a';
	// var req = new Request(url);
	// var response = await fetch(url);
	// var data = await response.json();
	// return data;
	// if (data.status == "ok") {
	// 	return data.articles;
	// }
	fetch(url)
	.then((resp) => resp.json())
	.then(function(data) {
		if (data.status == "ok") {
			var s = "";
			var i;
			for (i = 0; i < data.articles.length; i++) {
				s += data.articles[i].title + ". ";
			}
			getSentiment(s);
		}
		console.log(data);
	})
}

function getSentiment(s) {
	console.log(s);
	$.ajax({
		type: "POST",
		url: "https://language.googleapis.com/v1/documents:analyzeSentiment?fields=documentSentiment%2Clanguage%2Csentences&key=AIzaSyCRkHZ7wwR6xsxayK-o3Ha9NPZcTtYAKGo",
		data: {
			'document': {
				'content': s,
				'type': 'PLAIN_TEXT'
			},
			'encodingType': 'UTF8'
		},
		success: function(data) {
			console.log(data);
		},
		error: function(jqXHR, exception) {
			console.log(jqXHR);
			console.log(exception);
		}
	});
}