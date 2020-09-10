//Main index page displayed on root of all notes.

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notes from '../../components/Notes';
import * as actions from '../../store/actions/noteActions';
import { List, Grid } from 'semantic-ui-react';

class NotesIndexContainer extends React.Component {
	// Renders Notes presentational with data passed down through store to props
	// below.

	render() {
		return (
			<Grid>
				<List divided verticalAlign="middle">
					<Notes notes={this.props.notes} />
				</List>
			</Grid>
		);
	}
}

//Gives access to notes in store and loading from store for conditional rendering.

function mapStateToProps(state) {
	return { notes: state.notePad.notes, loading: state.notePad.loading };
}

//Gives access to actions, specifically fetchNotes() in this case.

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

//Connects to store.

export default connect(mapStateToProps, mapDispatchToProps)(NotesIndexContainer);
