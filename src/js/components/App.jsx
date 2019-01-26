import React from "react";
import ReactDOM from "react-dom";
import Movie from "./Movie.jsx";
import Search from "./Search.jsx";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			movieList: [],
			displayMovieList: []
		};
		this.updateQuery = this.updateQuery.bind(this);
		this.updateDisplayMovieList = this.updateDisplayMovieList.bind(this);
	}
	componentDidMount() {
		this.setState({ 
			movieList: this.props.movieList,
			displayMovieList: this.props.movieList
		});
	}
	updateQuery(event) {
		this.setState({ query: event.target.value });
	}
	updateDisplayMovieList() {
		var newList = this.state.movieList.filter((movie) => {
			return movie.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
		});
		this.setState({ displayMovieList: newList });
	}
	render() {
		return (
			<div>
				<Search 
					updateQuery={this.updateQuery} 
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