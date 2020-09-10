//Functional component. Consists of a button that on click
//fires destroy, and thus the action to delete a Note from the store and API.

import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const DeleteNote = ({ note, actions }) => {
	const destroy = () => {
		const id = note.id;
		actions.deleteNote(id);
	};

	const hardDestroy = () => {
		const id = note.id;
		actions.hardDeleteNote(id);
	};

	const editLinkStyle = { color: 'rgba(0,0,0,.6)' };

	return (
		<div>
			<Button>
				<Link style={editLinkStyle} to={`/notes/${note.id}/edit`}>
					Edit {note.title}
				</Link>
			</Button>
			<Button type="button" onClick={destroy}>
				{' '}
				Delete Note{' '}
			</Button>
			<Button type="button" onClick={hardDestroy}>
				{' '}
				Delete Note Forever
			</Button>
		</div>
	);
};

export default DeleteNote;
