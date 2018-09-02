import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

export default class MessageInput extends Component {

	constructor(props) {
		super(props);

		this.state = { message: "", isTyping: false };
		this.handleSubmit = this.handleSubmit.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
	}

	/*
	*	Handles submitting of form.
	*	@param e {Event} onsubmit event
	*/
	handleSubmit(e) {
		e.preventDefault()
		this.sendMessage()
		this.setState({ message: "" })
	}

	/*
	*	Send message to add to chat.
	*/
	sendMessage() {

		this.props.sendMessage(this.state.message)

	}

	componentWillUnmount() {
		this.stopCheckingTyping();

	}

	/*
	*	Starts/Stops the interval for checking
	*/
	sendTyping() {
		this.lastUpdateTime = Date.now()
		if (!this.state.isTyping) {
			this.setState({ isTyping: true })
			this.props.sendTyping(true);
			this.startCheckingTyping()
		}
	}

	/*
	*	Start an interval that check if the user is typing
	*/
	startCheckingTyping() {
		this.typingInterval = setInterval(() => {

			if ((Date.now() - this.lastUpdateTime) > 300) {
				this.setState({ isTyping: false })
				this.stopCheckingTyping()
			}
		}, 300)
	}

	/*
	*	Stops the interval from checking if the user is typing
	*/
	stopCheckingTyping() {
		if (this.typingInterval) {
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
	}
	blur = () => {
		this.refs.messageinput.blur()
	}
	render() {
		const { message } = this.state
		return (
			<div className="message-input">
				<form
					onSubmit={this.handleSubmit}
					className="message-form">

					<input
						id="message"
						ref={"messageinput"}
						type="text"
						className="form-control"
						value={message}
						autoFocus
						cols="40" rows="5"
						autoComplete={'off'}
						placeholder="Type something to send"
						onKeyUp={(e) => { e.keyCode !== 13 && this.sendTyping() }}
						onChange={
							({ target: { value: v } }) => {
								this.setState({ message: v })
							}
						} />
					<button
						disabled={message.length < 1}
						type="submit"
						className="send">
						<Icon>
							send
              </Icon>
					</button>
				</form>
			</div>

		);
	}
}

MessageInput.propTypes = {
	sendTyping: PropTypes.func.isRequired,
	sendMessage: PropTypes.func.isRequired
};