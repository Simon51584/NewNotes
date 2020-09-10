import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import NotesIndexContainer from './containers/Note/NotesIndexContainer';
import NoteShowContainer from './containers/Note/NoteShowContainer';
import CreateNoteContainer from './containers/Note/CreateNoteContainer';
import UpdateNoteContainer from './containers/Note/UpdateNoteContainer';
import TrashContainer from './containers/Note/TrashContainer';
import UpdatedNote from './components/UpdatedNote';
import CreatedNote from './components/CreatedNote';
import DeletedNote from './components/DeletedNote';
import NavigationBar from './components/NavigationBar';
import ErrorAlert from './components/ErrorAlert';
import history from './history';
import Spinner from './components/Spinner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions/noteActions';
import { Container } from 'semantic-ui-react';

//Main app page, including access to and router
//router with access to history. Navigation bar to appear
//on all routes nested under div, then a switch depending on URL route to display
//appropriate component, exact used to avoid trip ups with `notes/:id`

class App extends React.Component {
	componentDidMount() {
		if (this.props.notes.length === 0) {
			this.props.actions.fetchNotes();
		}
		if (this.props.trash.length === 0) {
			this.props.actions.fetchTrash();
		}
	}

	render() {
		return (
			<div>
				{this.props.loading ? (
					<Spinner />
				) : (
					<Router history={history}>
						<Container>
							<NavigationBar />
							<Switch>
								<Route exact path={`/`} component={NotesIndexContainer} />
								<Route exact path={`/notes/new`} component={CreateNoteContainer} />
								<Route exact path={`/notes/trash`} component={TrashContainer} />
								<Route exact path={`/notes/:id/edited`} component={UpdatedNote} />
								<Route exact path={`/notes/:id/deleted`} component={DeletedNote} />
								<Route exact path={`/notes/:id/created`} component={CreatedNote} />
								<Route exact path={`/notes/:id/edit`} component={UpdateNoteContainer} />
								<Route exact path={`/notes/:id`} component={NoteShowContainer} />
								<Route exact path={`/error/`} component={ErrorAlert} />
							</Switch>
						</Container>
					</Router>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { notes: state.notePad.notes, trash: state.notePad.trash, loading: state.notePad.loading };
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
