import React from "react";
import ReactDOM from "react-dom";
import { Panel } from "react-bootstrap";

class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			className: "movie"
		};
	}
	render() {
		let status = this.props.movie.watched ? 'watched' : 'to-watch';
		let color;
		if (status === 'watched') {
			color = 'green';
		} else if (status === 'to-watch') {
			color = 'red';
		}
		let className = "button " + color;
		let index = this.props.eventKey;
		let bsStyle = this.props.activeKey === index ? "success" : "default";
		return (
			<Panel eventKey={index} bsStyle={bsStyle} onClick={this.expand}>
				<Panel.Heading>
					<Panel.Title toggle>
						{this.props.movie.title}
					</Panel.Title>
	        <Panel.Collapse>
	          <Panel.Body>
	          	<div>
	          		<b>Year:</b> {this.props.movie.year}
	          	</div>
	          	<div>
	          		<b>Rating:</b> {this.props.movie.rating}
	          	</div>  
							<button 
								className={className}
								title={this.props.movie.title}
								onClick={this.props.toggle}>
								{status}
							</button>	          	
	          </Panel.Body>
	          <img src={this.props.movie.image}/>
	        </Panel.Collapse>
				</Panel.Heading>
			</Panel>
		);
	}
}

export default Movie;