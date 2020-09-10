// Presentational component: Shows an updated note before rerendering through
//history push.

import React from 'react';
import { connect } from 'react-redux';
import Timer from '../containers/Note/Timer';
import { Segment, Header, Divider } from 'semantic-ui-react';

const CreatedNote = ({ note, loading }) => {
	return (
		<Segment inverted>
			<Header as="h4">You have created your note! -</Header>
			<h3>Title: {note.title}</h3>
			<p>{note.content}</p>
			<Divider />
			<Timer />
		</Segment>
	);
};

const mapStateToProps = (state, ownProps) => {
	const note = state.notePad.notes.find(note => note.id === ownProps.match.params.id);
	const loading = state.notePad.loading;

	if (note) {
		return { note, loading };
	} else {
		return { note: {} };
	}
};

//Connects to store.

export default connect(mapStateToProps)(CreatedNote);
