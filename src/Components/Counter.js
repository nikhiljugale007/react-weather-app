import React, { Component } from "react";

export default class Counter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 0,
			visible: true,
		};
	}
	increase = () => {
		this.setState({
			counter: this.state.counter + 1,
		});
	};

	decrease = () => {
		this.setState({
			counter: this.state.counter - 1,
		});
	};

	toggle = () => {
		this.setState({
			visible: !this.state.visible,
		});
	};

	render() {
		return (
			<div>
				{this.state.visible ? (
					<div>
						<div>{this.state.counter}</div>
						<button onClick={this.increase}>Increment</button>
						<button onClick={this.decrease}>Decrement</button>
					</div>
				) : (
					<div>Hidden</div>
				)}

				<button onClick={this.toggle}>Toggle</button>
			</div>
		);
	}
}
