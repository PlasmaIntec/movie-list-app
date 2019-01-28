import React from "react";
import ReactDOM from "react-dom";
import Movie from "./Movie.jsx";
import { Panel, PanelGroup, Accordion } from "react-bootstrap";

class MovieList extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleSelect(activeKey) {
		this.props.handleSelect(activeKey);
	}
	render() {
		return (
			<PanelGroup 
				accordion 
				className="movies"
				activeKey={this.props.activeKey}
				onSelect={this.handleSelect}
			>
				{
					this.props.movieList.length === 0 ?
					<div>No Entries Found</div> : // TODO: tooltip
					this.props.movieList.map((movie, index) => 
						<Movie 
							eventKey={index}
							activeKey={this.props.activeKey}
							movie={movie}
							toggle={this.props.toggle}
						/>
					)
				}
			</PanelGroup>
		);
	}
}

export default MovieList;