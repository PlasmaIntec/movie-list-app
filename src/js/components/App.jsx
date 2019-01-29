import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search.jsx";
import AddMovie from "./AddMovie.jsx";
import MovieList from "./MovieList.jsx";
import searchMovieDB from "./SearchMovieDB.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movieList: [],
			displayMovieList: [],
			currentTab: "toWatch",
			activeKey: '0'
		};
		this.updateDisplayMovieList = this.updateDisplayMovieList.bind(this);
		this.addToMovieList = this.addToMovieList.bind(this);
		this.showWatched = this.showWatched.bind(this);
		this.showToWatch = this.showToWatch.bind(this);
		this.toggleWatchedStatus = this.toggleWatchedStatus.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
	showToWatch() {
		this.setState({ currentTab: "toWatch", activeKey: '0' }, () => {
			this.updateDisplayMovieList();		
		});
	}
	showWatched() {
		this.setState({ currentTab: "watched", activeKey: '0' }, () => {
			this.updateDisplayMovieList();		
		});
	}
	toggleWatchedStatus(event) {
		var title = event.target.title;
		var index = this.state.movieList.map(movie => movie.title).indexOf(title);
		var newList = this.state.movieList;
		newList[index].watched = !newList[index].watched;
		this.setState({ movieList: newList, activeKey: '0' });
		this.updateDisplayMovieList();		
	}
	handleSelect(activeKey) {
		this.setState({ activeKey });
	}
	componentDidMount() {
		var initialMoviePromiseArray = this.props.movieList.map(movie => {
			return new Promise((resolve, reject) => {
				searchMovieDB(movie, (error, result) => {
					if (error) { 
						console.error(error);
						reject(error);
					} else {
						var newMovie = { 
							title: result.title, 
							year: result.release_date.slice(0, 4), 
							rating: result.vote_average,
							image: 'http://image.tmdb.org/t/p/w185/' + result.poster_path,
							watched: false, 
						};
						resolve(newMovie);
					}
				});
			});
		});
		Promise.all(initialMoviePromiseArray)
			.then(movieList => {
				this.setState({ 
					movieList: movieList,
					displayMovieList: movieList
				});
			});
	}
	updateDisplayMovieList() {
		var newList = this.state.movieList.filter((movie) => {
			return movie.title.toLowerCase().indexOf(this.searchQuery.value.toLowerCase()) !== -1
				&& movie.watched === (this.state.currentTab === 'watched' ? true : false);
		});
		this.setState({ displayMovieList: newList, activeKey: '0' });
		this.searchQuery.value = '';
		this.newTitle.value = '';	
	}
	addToMovieList() {
		var newList = this.state.movieList;
		if (this.newTitle.value.length > 0) {			
			searchMovieDB(this.newTitle.value, (error, result) => {
				if (error) { 
					console.error(error);
				} else {
					newList.push({ 
						title: result.title, 
						year: result.release_date.slice(0, 4), 
						rating: result.vote_average,
						image: 'http://image.tmdb.org/t/p/w185/' + result.poster_path,
						watched: false, 
					});
					this.setState({ movieList: newList});
					this.updateDisplayMovieList();
				}				
			});
		} else {
			alert('NOT LONG'); // TODO: tooltip
		}
	}
	render() {
		let toWatchClassName = this.state.currentTab === 'toWatch' ? 'green' : 'neutral';
		let watchedClassName = this.state.currentTab === 'watched' ? 'green' : 'neutral';
		return (
			<div>
				<AddMovie
					movieTitle={input => this.newTitle = input}
					addToMovieList={this.addToMovieList}
				/>
				<Search 
					searchQuery={input => this.searchQuery = input}
					updateDisplayMovieList={this.updateDisplayMovieList}
				/>
				<div className="tabs">
					<button className={toWatchClassName} onClick={this.showToWatch}>To Watch</button>
					<button className={watchedClassName} onClick={this.showWatched}>Watched</button>
				</div>
				<div>
					<MovieList 
						movieList={this.state.displayMovieList} 
						tab={this.state.currentTab}
						toggle={this.toggleWatchedStatus}
						activeKey={this.state.activeKey}
						handleSelect={this.handleSelect}
					/>
				</div>
			</div>
		);
	}
}

// var movies = [
//   {title: 'Mean Girls', watched: false},
//   {title: 'Hackers', watched: false},
//   {title: 'The Grey', watched: false},
//   {title: 'Sunshine', watched: false},
//   {title: 'Ex Machina', watched: false},
// ];

var movies = ['Mean Girls', 'Hackers', 'The Grey'];

fetch('localhost:3000/api/movies')
	.then(res => console.log(res));

ReactDOM.render(<App movieList={movies} />, document.getElementById("app"));