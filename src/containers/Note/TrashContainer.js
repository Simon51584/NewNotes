//Main index page displayed on root of all notes.

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrashNotes from '../../components/TrashNotes';
import * as actions from '../../store/actions/noteActions';
import ClearTrash from '../../components/ClearTrash';
import { List } from 'semantic-ui-react';

class TrashContainer extends React.Component {
	// Renders Notes presentational with data passed down through store to props
	// below.

	render() {
		return (
			<div>
				<List divided verticalAlign="middle">
					<TrashNotes notes={this.props.notes} actions={this.props.actions} />
					<List.Item>
						<List.Content floated="left">
							<ClearTrash actions={this.props.actions} />
						</List.Content>
					</List.Item>
				</List>
			</div>
		);
	}
}

//Gives access to notes in store.

function mapStateToProps(state) {
	return { notes: state.notePad.trash, loading: state.notePad.loading };
}

//Gives access to actions, specifically fetchNotes() in this case.

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

//Connects to store.

export default connect(mapStateToProps, mapDispatchToProps)(TrashContainer);
