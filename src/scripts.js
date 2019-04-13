function getNews(companyName) {
	var url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=124a2a2d87434a7abdb39858a824ef8a';
	var req = new Request(url);
	fetch(req).then(function(response) {
		console.log(response.json());
	})
}