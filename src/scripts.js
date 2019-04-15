function runAnalysis() {
	var companyName = document.getElementById("searchBar").value;
	var n = companyName.search(" Inc");
	if (n > 0) {
		companyName = companyName.substr(0, n);
	}
	document.getElementById("scoreWrapper").innerHTML = "<h3 style='color: white; margin: 0; padding: 0;'>loading...</h3>";
	getTicker(companyName);
	getNews(companyName);
}

function getNews(companyName) {
	var url = 'https://newsapi.org/v2/everything?q=\"' + companyName + '\"&apiKey=124a2a2d87434a7abdb39858a824ef8a';
	$.ajax({
		type: "GET",
		url: url,
		async: false,
		success: function(data) {
			if (data.status == "ok") {
				console.log("hello");
				var s = "";
				var i;
				clearArticles();
				var sum = 0;
				for (i = 0; i < data.articles.length; i++) {
					s += data.articles[i].title + ". ";
					sum += getSentiment(data.articles[i].title);
					addArticle(data.articles[i]);
				}
				displayScoreV2(sum);
				// getSentiment(s);
			} else {
				document.getElementById("scoreWrapper").innerHTML = "";
			}
			
		}
	});
	// fetch(url)
	// .then((resp) => resp.json())
	// .then(function(data) {
	// 	if (data.status == "ok") {
	// 		var s = "";
	// 		var i;
	// 		clearArticles();
	// 		var sum = 0;
	// 		for (i = 0; i < data.articles.length; i++) {
	// 			s += data.articles[i].title + ". ";
	// 			sum += getSentiment(data.articles[i].title);
	// 			addArticle(data.articles[i]);
	// 		}
	// 		displayScoreV2(sum);
	// 		// getSentiment(s);
	// 	}
	// 	console.log(data);
	// })
}

function clearArticles() {
	document.getElementById("articleWrapper").innerHTML = "";
}

function addArticle(article) {
	var fart = "<div class='article'><h3 class='articleTitle'><a href='" + article.url + "'>" + article.title + "</a></h3><p class='articleDescription'>" + article.description + "</p></div>";
	document.getElementById("articleWrapper").innerHTML += fart;
}

var sum = 0;

function getSentiment(s) {
	// console.log(s);
	var data =
	$.ajax({
		type: "POST",
		url: "https://language.googleapis.com/v1/documents:analyzeSentiment?fields=documentSentiment%2Clanguage%2Csentences&key=AIzaSyCRkHZ7wwR6xsxayK-o3Ha9NPZcTtYAKGo",
		async: false,
		headers: {
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
			'document': {
				'content': s,
				'type': 'PLAIN_TEXT'
			},
			'encodingType': 'UTF8'
		}),
		success: function(data) {
			// console.log(data);
			console.log("The sentiment score is: " + data.documentSentiment.score);
			// return data.documentSentiment.score;
			// displayScore(data.documentSentiment.score);
		},
		error: function(jqXHR, exception) {
			console.log(jqXHR);
			console.log(exception);
		}
	});
	var x = JSON.parse(data.responseText);
	return x.documentSentiment.score;
}

function displayScore(x) {
	var color = "yellow";
	var gradesLookup = ["F", "F", "D-", "D", "D+", "C-", "C", "C", "B-", "B-", "B", "B", "B", "B+", "B+", "A-", "A-", "A", "A", "A+", "A+"];
	if (x < -0.25) {
		color = "red";
	} else if (x > 0.25) {
		color = "green";
	}
	var score = (x+1)*5;
	var gradeInd = score*2;
	var grade = gradesLookup[gradeInd];
	document.getElementById("scoreWrapper").innerHTML = "<h1 style='color: " + color + "; margin: 0; padding: 0;'>" + grade + "</h1><h3 style='color: " + color + "; margin: 0; padding: 0;'>" + score + " out of 10</h3>";
}

function displayScoreV2(x) {
	var color = "yellow";
	var gradesLookup = ["F", "F", "D-", "D", "D+", "C-", "C", "C", "B-", "B-", "B", "B", "B", "B+", "B+", "A-", "A-", "A", "A", "A+", "A+"];
	if (x < -5) {
		color = "red";
	} else if (x > 5) {
		color = "green";
	}
	var score = (x+20)*2.5;
	console.log("x is " + x + " and score is " + score);
	var gradeInd = Math.floor(score/5);
	var grade = gradesLookup[gradeInd];
	document.getElementById("scoreWrapper").innerHTML = "<h1 style='color: " + color + "; margin: 0; padding: 0;'>" + grade + "</h1><h3 style='color: " + color + "; margin: 0; padding: 0;'>" + score + " out of 100</h3>";
}

function getTicker(searchVal) {
	var url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + searchVal + '&apikey=KYJ63OHXTZUJ9Q4I';
	var b;
	fetch(url)
	.then((resp) => resp.json())
	.then(function(data) {
		document.getElementById("stockWrapper").innerHTML = "";
		getStocks(data.bestMatches[0]["1. symbol"]);
	})
}