import fetch from 'isomorphic-fetch';
import history from '../../history';

//Handles initial errors based off of response attribute of json, calls a
//function to push to the error page if errors exist.

function handleErrors(response) {
	if (!response.ok) {
		const error = response.statusText;
		errorNotify(error);
	}
	return response;
}

//Pushes to error page and displays info on the error.

export function errorNotify(error) {
	history.push('/error/');
	alert(error);
}

// Through dispatch, tells store that it is fetching notes from API. Fetches
// notes. Dispatches notes to update store.

export function fetchNotes() {
	return function(dispatch) {
		dispatch({ type: 'LOADING_NOTES' });
		return fetch('/notes/')
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'FETCH_NOTES', payload: responseJson });
			})
			.catch(error => errorNotify(error));
	};
}

export function fetchTrash() {
	return function(dispatch) {
		dispatch({ type: 'LOADING_NOTES' });
		return fetch('/notes/trash')
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'FETCH_TRASH', payload: responseJson });
			})
			.catch(error => errorNotify(error));
	};
}

// Takes in form values and history prop, posts new values of Note to API. Pushes
// to root directory after creation.

export function createNote(values) {
	const request = {
		method: 'POST',
		body: JSON.stringify(values),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return function(dispatch) {
		dispatch({ type: 'LOADING_NOTES' });
		return fetch(`/notes/`, request)
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'CREATE_NOTE', payload: responseJson });
				history.push(`/notes/${responseJson.id}/created`);
				setTimeout(() => {
					history.push('/');
				}, 10000);
			})
			.catch(error => errorNotify(error));
	};
}

// Takes in id of specific note as argument. Pushes to page displaying info
// on the deleted note. Deletes note through fetch request. After 10 seconds,
// pushes to root index page.

export function deleteNote(id) {
	const request = {
		method: 'PATCH',
		body: JSON.stringify({ deleted: true }),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	history.push(`/notes/${id}/deleted`);
	return function(dispatch) {
		dispatch({ type: 'LOADING_NOTES' });
		fetch(`/notes/${id}`, request)
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'DELETE_NOTE', payload: responseJson });
			})
			.catch(error => errorNotify(error));
		setTimeout(() => {
			history.push(`/notes/trash/`);
		}, 10000);
	};
}

// Takes in same args as createNote, for Note being updated. Throws API
// patch request to appropriate route. Pushes to page with info on the edited
// info, then after 10 seconds returns to root index.

export function updateNote(values, id) {
	const request = {
		method: 'PATCH',
		body: JSON.stringify(values),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return function(dispatch) {
		dispatch({ type: 'LOADING_NOTES' });
		fetch(`/notes/${id}`, request)
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'UPDATE_NOTE', payload: responseJson });
			})
			.catch(error => errorNotify(error))
			.then(history.push(`/notes/${id}/edited`));
		setTimeout(() => {
			history.push('/');
		}, 10000);
	};
}

export function hardDeleteNote(id) {
	const request = {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	history.push(`/notes/${id}/deleted`);
	return function(dispatch) {
		dispatch({ type: 'LOADING_NOTES' });
		fetch(`/notes/${id}`, request)
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'HARD_DELETE_NOTE', payload: responseJson });
			})
			.catch(error => errorNotify(error));
		setTimeout(() => {
			history.push('/');
			dispatch({ type: 'CLEAR_DELETED_NOTE' });
		}, 10000);
	};
}

export function hardWipeNote(id) {
	const request = {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	history.push(`/notes/${id}/deleted`);
	return function(dispatch) {
		dispatch({ type: 'LOADING_NOTES' });
		fetch(`/notes/${id}`, request)
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'HARD_WIPE_NOTE', payload: responseJson });
			})
			.catch(error => errorNotify(error));
		setTimeout(() => {
			history.push('/');
			dispatch({ type: 'CLEAR_DELETED_NOTE' });
		}, 10000);
	};
}

export function clearTrash() {
	const request = { method: 'delete', headers: { 'Content-Type': 'application/json' } };
	history.push('/');
	return function(dispatch) {
		dispatch({ type: 'CLEAR_TRASH' });
		fetch(`/notes/trash`, request)
			.then(handleErrors)
			.then(res => res.json())
			.catch(error => errorNotify(error));
	};
}

export function restoreNote(id) {
	const request = {
		method: 'PATCH',
		body: JSON.stringify({ deleted: false }),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	history.push('/');
	return function(dispatch) {
		dispatch({ type: 'LOADING_NOTES' });
		fetch(`/notes/${id}`, request)
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'RESTORE_NOTE', payload: responseJson });
			});
	};
}

export function like(id, isLiked) {
	const request = {
		method: 'PATCH',
		body: JSON.stringify({ liked: !isLiked }),
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return function(dispatch) {
		fetch(`/notes/${id}`, request)
			.then(handleErrors)
			.then(res => res.json())
			.then(responseJson => {
				dispatch({ type: 'UPDATE_NOTE', payload: responseJson });
			})
			.catch(error => errorNotify(error));
	};
}
