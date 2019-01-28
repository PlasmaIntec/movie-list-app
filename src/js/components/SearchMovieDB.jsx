var searchMovieDB = (options, callback) => {
	var API_KEY = 'cdba2e8e2a271f7a3ad52c7a244081bc';
	var query = options.replace(/\s+/g, '+');
	console.log(query);
	var url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`;
	fetch(url)
		.then(res => res.json())
		.then(res => {
			if (res.results.length === 0) {
				throw new Error('No Results');
			}
			var firstResult = res.results[0];
			console.log(res);
			callback(firstResult);
		})
		.catch(err => console.error(err));
}

export default searchMovieDB;