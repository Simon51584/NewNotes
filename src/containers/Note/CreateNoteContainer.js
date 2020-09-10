//Stateful component responsible for creation of new notes.

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/noteActions.js';
import { Button, Form, Segment, Input, TextArea } from 'semantic-ui-react';

class CreateNoteContainer extends React.Component {
	// Constructor sets initial state of form values to empty strings and takes in
	// props.

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
		};
	}

	//onChange event to handle form input into state change.

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	// Passes state set by handleChangeinto action responsible for creating new notes,
	// prevents default action of form.

	submitForm(e) {
		const values = this.state;
		this.props.actions.createNote(values);
		e.preventDefault();
	}

	// Simple creation form with onSubmit form handler, values set by state and
	// changed with user input, as well as requiring presence of data in form fields
	// through required.

	render() {
		return (
			<div>
				<Segment inverted>
					<Form inverted onSubmit={e => this.submitForm(e)}>
						<h2>New Note!</h2>
						<Form.Field>
							<label>Note Title:</label>
							<Input
								type="text"
								name="title"
								value={this.state.title}
								onChange={this.handleChange}
								required
							/>
							<br />
						</Form.Field>
						<Form.Field>
							<label>
								{' '}
								Note Content:<br />{' '}
							</label>
							<TextArea
								autoHeight
								name="content"
								value={this.state.content}
								onChange={this.handleChange}
								required
							/>
							<br />
						</Form.Field>
						<Button>Submit</Button>
					</Form>
				</Segment>
			</div>
		);
	}
}

//Allows actions to be accessed as props at this.props.actions.[action]

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

//Connects component to redux store.

export default connect(null, mapDispatchToProps)(CreateNoteContainer);
