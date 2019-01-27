import React from "react";
import ReactDOM from "react-dom";

var AddMovie = (props) => (
	<div className="addmovie-bar">
		<input 
			className="addmovie-field" 
			ref={props.movieTitle} 
			type="text"
			placeholder="Add movie title here"
		/>
		<button 
			className="addmovie-button button" 
			onClick={props.addToMovieList}>
			Add
		</button>
	</div>
);

export default AddMovie;