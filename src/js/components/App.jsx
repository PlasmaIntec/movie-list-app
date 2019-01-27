import React from "react";
import ReactDOM from "react-dom";
import Movie from "./Movie.jsx";
import Search from "./Search.jsx";
import AddMovie from "./AddMovie.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movieList: [],
			displayMovieList: []
		};
		this.updateDisplayMovieList = this.updateDisplayMovieList.bind(this);
		this.addToMovieList = this.addToMovieList.bind(this);
	}
	componentDidMount() {
		this.setState({ 
			movieList: this.props.movieList,
			displayMovieList: this.props.movieList
		});
	}
	updateDisplayMovieList() {
		var newList = this.state.movieList.filter((movie) => {
			return movie.title.toLowerCase().indexOf(this.searchQuery.value.toLowerCase()) !== -1;
		});
		this.setState({ displayMovieList: newList });
		this.searchQuery.value = '';
	}
	addToMovieList() {
		var newList = this.state.movieList;
		newList.push({ title: this.newTitle.value });
		this.setState({ movieList: newList});
		this.updateDisplayMovieList();
		this.newTitle.value = '';
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
				{
					this.state.displayMovieList.length === 0 ?
					<div>No Entries Found</div> :
					this.state.displayMovieList.map(movie => 
						<Movie title={movie.title} />
					)
				}
			</div>
		);
	}
}

var movies = [
  {title: 'Mean Girls'},
  {title: 'Hackers'},
  {title: 'The Grey'},
  {title: 'Sunshine'},
  {title: 'Ex Machina'},
];

ReactDOM.render(<App movieList={movies} />, document.getElementById("app"));