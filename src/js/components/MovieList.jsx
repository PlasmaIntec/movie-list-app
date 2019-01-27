import React from "react";
import ReactDOM from "react-dom";
import Movie from "./Movie.jsx";

var MovieList = (props) => (
	<div className="movies">
		{
			props.movieList.length === 0 ?
			<div>No Entries Found</div> : // TODO: tooltip
			props.movieList.map((movie) => 
				<Movie 
					title={movie.title}
					watched={movie.watched}
					toggle={props.toggle}
				/>
			)
		}
	</div>
);

export default MovieList;