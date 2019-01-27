import React from "react";
import ReactDOM from "react-dom";

var Movie = (props) => {
	let status = props.watched ? 'watched' : 'to-watch';
	let className = "button " + status;
	return (
		<div className="movie">
			<div className="movieTitle">
				{props.title}
			</div>
			<button 
				className={className}
				title={props.title}
				onClick={props.toggle}>
				{status}
			</button>
		</div>
	);
}

export default Movie;