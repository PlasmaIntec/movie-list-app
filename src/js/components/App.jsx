import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search.jsx";
import AddMovie from "./AddMovie.jsx";
import MovieList from "./MovieList.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movieList: [],
			displayMovieList: [],
			currentTab: "toWatch"
		};
		this.updateDisplayMovieList = this.updateDisplayMovieList.bind(this);
		this.addToMovieList = this.addToMovieList.bind(this);
		this.showWatched = this.showWatched.bind(this);
		this.showToWatch = this.showToWatch.bind(this);
		this.toggleWatchedStatus = this.toggleWatchedStatus.bind(this);
	}
	showToWatch() {
		this.setState({ currentTab: "toWatch" }, () => {
			this.updateDisplayMovieList();		
		});
	}
	showWatched() {
		this.setState({ currentTab: "watched" }, () => {
			this.updateDisplayMovieList();		
		});
	}
	toggleWatchedStatus(event) {
		event.persist();
		var title = event.target.title;
		var index = this.state.movieList.map(movie => movie.title).indexOf(title);
		var newList = this.state.movieList;
		newList[index].watched = newList[index].watched ? false : true;
		this.setState({ movieList: newList });
		this.updateDisplayMovieList();		
	}
	componentDidMount() {
		this.setState({ 
			movieList: this.props.movieList,
			displayMovieList: this.props.movieList
		});
	}
	updateDisplayMovieList() {
		var newList = this.state.movieList.filter((movie) => {
			return movie.title.toLowerCase().indexOf(this.searchQuery.value.toLowerCase()) !== -1
				&& movie.watched === (this.state.currentTab === 'watched' ? true : false);
		});
		this.setState({ displayMovieList: newList });
		this.searchQuery.value = '';
	}
	addToMovieList() {
		var newList = this.state.movieList;
		if (this.newTitle.value.length > 0) {
			newList.push({ title: this.newTitle.value, watched: false });
			this.setState({ movieList: newList});
			this.newTitle.value = '';
			this.updateDisplayMovieList();
		} else {
			alert('NOT LONG'); // TODO: tooltip
		}
	}
	render() {
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
					<button onClick={this.showToWatch}>To Watch</button>
					<button onClick={this.showWatched}>Watched</button>
				</div>
				<div>
					<MovieList 
						movieList={this.state.displayMovieList} 
						tab={this.state.currentTab}
						toggle={this.toggleWatchedStatus}
					/>
				</div>
			</div>
		);
	}
}

var movies = [
  {title: 'Mean Girls', watched: false},
  {title: 'Hackers', watched: false},
  {title: 'The Grey', watched: false},
  {title: 'Sunshine', watched: false},
  {title: 'Ex Machina', watched: false},
];

ReactDOM.render(<App movieList={movies} />, document.getElementById("app"));