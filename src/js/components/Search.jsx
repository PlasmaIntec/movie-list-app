import React from "react";
import ReactDOM from "react-dom";

var Search = (props) => (
	<div className="search-bar">
		<input className="search-field" onChange={props.updateQuery} type="text" />
		<button className="search-button" onClick={props.updateDisplayMovieList}>
			Go!
		</button>
	</div>
);

export default Search;