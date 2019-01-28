import React from "react";
import ReactDOM from "react-dom";

class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			className: "movie"
		};
		this.expand = this.expand.bind(this);
	}
	expand(event) {
		let showInfo = "movie";
		this.setState({ className: showInfo});
	}
	render() {
		let status = this.props.watched ? 'watched' : 'to-watch';
		let color;
		if (status === 'watched') {
			color = 'green';
		} else if (status === 'to-watch') {
			color = 'red';
		}
		let className = "button " + color;
		return (
			<div className={this.state.className} onClick={this.expand}>
				<div className="movieTitle">
					{this.props.title}
				</div>
				<button 
					className={className}
					title={this.props.title}
					onClick={this.props.toggle}>
					{status}
				</button>
			</div>
		);
	}
}

export default Movie;