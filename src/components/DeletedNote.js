// Presentational component: Displays a single deleted note

import React from 'react';
import { connect } from 'react-redux';
import Timer from '../containers/Note/Timer';
import { Segment, Header, Divider } from 'semantic-ui-react';

const DeletedNote = ({ deletedNote, loading }) => {
	return (
		<Segment inverted>
			<Header as="h4">Note has been deleted!! -</Header>
			<h3>Title: {deletedNote.title}</h3>
			<p>{deletedNote.content}</p>
			<Divider />
			<Timer />
		</Segment>
	);
};

const mapStateToProps = (state, ownProps) => {
	const deletedNote = state.notePad.deletedNote;
	const loading = state.notePad.loading;

	return { deletedNote, loading };
};

export default connect(mapStateToProps)(DeletedNote);
